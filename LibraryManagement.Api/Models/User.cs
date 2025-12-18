using System.ComponentModel.DataAnnotations;

namespace LibraryManagement.Api.Models;

//User Model
public class User
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(100), EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [MaxLength(20)]
    public string Role { get; set; } = "User";   // "User" or "Admin"

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

}
