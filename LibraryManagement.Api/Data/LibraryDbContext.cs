using LibraryManagement.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagement.Api.Data;

public class LibraryDbContext : DbContext
{
    //Load and pass configuration data to parent
    public LibraryDbContext(DbContextOptions<LibraryDbContext> options)
        : base(options) { }

    //Represent Book entity
    public DbSet<Book> Books => Set<Book>();


    //Table schema
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);


        modelBuilder.Entity<Book>(entity =>
    {
        entity.HasKey(b => b.Id);

        entity.Property(b => b.Title)
              .IsRequired()
              .HasMaxLength(200);

        entity.Property(b => b.Author)
              .IsRequired()
              .HasMaxLength(150);
    });
    }
}
