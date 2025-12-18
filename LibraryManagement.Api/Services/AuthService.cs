using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LibraryManagement.Api.Data;
using LibraryManagement.Api.DTOs.Users;
using LibraryManagement.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace LibraryManagement.Api.Services;

public class AuthService
{
    // Dependencies
    private readonly LibraryDbContext _db;
    private readonly IConfiguration _config;

    private readonly PasswordHasher<object> _hasher = new();

    // Constructor
    public AuthService(LibraryDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    //Raw password -> hashed password
    private string HashPassword(string password)
        => _hasher.HashPassword(new object(), password);

    //verify password
    private bool VerifyPassword(string hashedPassword, string password)
        => _hasher.VerifyHashedPassword(new object(), hashedPassword, password)
           == PasswordVerificationResult.Success;

    //Create JWT Token
    private string CreateJwtToken(User user)
    {
        var jwt = _config.GetSection("Jwt");

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var expiresMinutes = int.Parse(jwt["ExpiresMinutes"]!);

        var token = new JwtSecurityToken(
            issuer: jwt["Issuer"],
            audience: jwt["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiresMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }


    // Register a new user
    public async Task<string> RegisterUser(UserRegisterDto dto)
    {
        var exists = await _db.Users.AnyAsync(u => u.Email == dto.Email);
        if (exists) throw new InvalidOperationException("Email already exists");

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = HashPassword(dto.Password),
            Role = dto.Role ?? "User"
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return CreateJwtToken(user);
    }

    // Login existing user
    public async Task<string> LoginUser(UserLoginDto dto)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user is null) throw new InvalidOperationException("User not found");

        if (!VerifyPassword(user.PasswordHash, dto.Password))
            throw new InvalidOperationException("Invalid credentials");

        return CreateJwtToken(user);
    }
}
