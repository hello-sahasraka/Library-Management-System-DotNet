namespace LibraryManagement.Api.DTOs.Books;

public record class RespondBookDto(
    int Id,
    string Title,
    string Author,
    string? Description
);
