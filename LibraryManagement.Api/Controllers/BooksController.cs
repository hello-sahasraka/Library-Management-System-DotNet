using LibraryManagement.Api.DTOs.Books;
using LibraryManagement.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagement.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class BooksController : ControllerBase
{
    //Create placeholder for BooksService instance
    private readonly BooksService _booksService;

    //Assign BooksService instance
    public BooksController(BooksService booksService)
    {
        _booksService = booksService;
    }

    //Get all books
    //GET: api/v1/books
    [HttpGet]
    public async Task<ActionResult<List<RespondBookDto>>> GetAllBooks()
    {
        var books = await _booksService.GetAllBooks();
        return Ok(books);
    }

    //Get
    //  book by Id
    //GET: api/v1/books/{id}
    [HttpGet("{id:int}")]
    public async Task<ActionResult<RespondBookDto>> GetBookById(int id)
    {
        try
        {
            var book = await _booksService.GetBookById(id);
            return Ok(book);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }

    }

    //Creaete a new book
    //POST: api/v1/bboks
    [HttpPost]
    public async Task<ActionResult<RespondBookDto>> CreateBook(CreateBookDto book)
    {
        try
        {
            var respond = await _booksService.CreateBook(book);

            if (respond is null)
                return BadRequest("Failed to create book");

            return CreatedAtAction(nameof(GetBookById), new { id = respond.Id }, respond);
        }
        catch (DbUpdateException)
        {
            return StatusCode(500, "Database error while creating the book");
        }
    }

    //Update an existing book
    //PUT: api/v1/books/{id}
    [HttpPut("{id:int}")]
    public async Task<ActionResult<RespondBookDto>> UpdateBook(int id, [FromBody] UpdateBookDto book)
    {
        try
        {
            var updated = await _booksService.UpdateBook(id, book);
            return Ok(updated);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (DbUpdateException)
        {
            return StatusCode(500, "Database error while updating the book");
        }
    }

    //Delete a book
    //DELETE: api/v1/books/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        try
        {
            await _booksService.DeleteBook(id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (DbUpdateException)
        {
            return StatusCode(500, "Database error while deleting the book");
        }
    }
}
