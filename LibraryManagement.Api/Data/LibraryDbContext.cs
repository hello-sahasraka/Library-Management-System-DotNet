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
    //Represent User entity
    public DbSet<User> Users => Set<User>();

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

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);

            modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);

            entity.HasIndex(u => u.Email)
                    .IsUnique();
        });

        });

    }
}
