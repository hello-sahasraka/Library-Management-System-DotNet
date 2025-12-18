namespace LibraryManagement.Api.DTOs.Users;

public record class UserRegisterDto(
    string Name, 
    string Email, 
    string Password,
    string? Role
);
