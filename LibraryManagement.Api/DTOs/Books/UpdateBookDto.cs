namespace LibraryManagement.Api.DTOs.Books;

public record class UpdateBookDto(
    string? Title,
    string? Author,
    string? Description
);
