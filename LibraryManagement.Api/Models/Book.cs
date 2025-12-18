using System.ComponentModel.DataAnnotations;

namespace LibraryManagement.Api.Models;


//Book Model
public class Book
{   [Key]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Author { get; set; } = string.Empty;

    public string? Description { get; set; }
}
