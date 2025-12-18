namespace LibraryManagement.Api.DTOs.Users;

public record class UserLoginDto (
    string Email,
    string Password
);