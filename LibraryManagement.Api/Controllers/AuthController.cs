using LibraryManagement.Api.DTOs.Users;
using LibraryManagement.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagement.Api.Controllers;

[ApiController]
[Route("api/v1/auth")]
public class AuthController : ControllerBase
{
    //Dependencies
    private readonly AuthService _auth;
    public AuthController(AuthService auth)
    {
        _auth = auth;
    }

    //Register a new user
    //Post: api/v1/auth/register
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] UserRegisterDto dto)
    {
        try
        {
            var token = await _auth.RegisterUser(dto);
            var response = new AuthResponseDto(token, dto.Name, dto.Role);
            return Ok(response);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }


    //Login existing user
    //Post: api/v1/auth/login
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] UserLoginDto dto)
    {
        try
        {
            var response = await _auth.LoginUser(dto);
            return Ok(response);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
