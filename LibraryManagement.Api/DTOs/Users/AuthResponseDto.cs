namespace LibraryManagement.Api.DTOs.Users;

public record class AuthResponseDto (
    string Token,
    string? Name,
    string? Role
);