namespace LibraryManagement.Api.DTOs.Books;

public record class CreateBookDto(
    string Title,
    string Author,
    string? Description
);
