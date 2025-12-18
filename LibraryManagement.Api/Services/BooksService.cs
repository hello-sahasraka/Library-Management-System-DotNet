using LibraryManagement.Api.Data;
using LibraryManagement.Api.DTOs.Books;
using LibraryManagement.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagement.Api.Services;

public class BooksService
{
    //Create placeholder for LibraryDbContext instance
    private readonly LibraryDbContext _context;

    //Assign LibraryDbContext instance
    public BooksService(LibraryDbContext context)
    {
        _context = context;
    }

    //Gett all books
    public async Task<List<RespondBookDto>> GetAllBooks()
    {
        return await _context.Books
            .AsNoTracking()
            .Select(book => new RespondBookDto(//Map Book to RespondBookDto
                book.Id,
                book.Title,
                book.Author,
                book.Description
            ))
            .ToListAsync();
    }

    //Get a book by its Id
    public async Task<RespondBookDto?> GetBookById(int id)
    {
        var respond = await _context.Books.AsNoTracking().FirstOrDefaultAsync(b => b.Id == id);

        if (respond is null) throw new KeyNotFoundException($"Book with id {id} not found");

        //Map Book to RespondBookDto
        return new RespondBookDto(
            respond.Id,
            respond.Title,
            respond.Author,
            respond.Description
        );
    }

    //Create a New book
    public async Task<RespondBookDto> CreateBook(CreateBookDto dto)
    {
        var book = new Book
        {
            Title = dto.Title,
            Author = dto.Author,
            Description = dto.Description
        };

        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        //Map Book to RespondBookDto
        return new RespondBookDto(
            book.Id,
            book.Title,
            book.Author,
            book.Description
        );
    }

    //Update a existing record
    public async Task<Book?> UpdateBook(int id, UpdateBookDto book)
    {
        var existing = await _context.Books.FirstOrDefaultAsync(b => b.Id == id);
        if (existing is null) throw new KeyNotFoundException($"Book with id {id} not found");

        if (book.Title is not null) existing.Title = book.Title;
        if (book.Author is not null) existing.Author = book.Author;
        if (book.Description is not null) existing.Description = book.Description;

        await _context.SaveChangesAsync();
        return existing;
    }

    //Delete a existing record
    public async Task DeleteBook(int id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book is null) throw new KeyNotFoundException($"Book with id {id} not found");

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
    }

}
