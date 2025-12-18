using LibraryManagement.Api.Data;
using LibraryManagement.Api.Extensions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers();

//Register the database
builder.Services.AddDbContext<LibraryDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

//Register JWT Authentication
builder.Services.AddJwtAuthentication(builder.Configuration);

//Register Auth Service
builder.Services.AddScoped<LibraryManagement.Api.Services.AuthService>();
//Register Services
builder.Services.AddScoped<LibraryManagement.Api.Services.BooksService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("dev", policy =>
        policy.WithOrigins("http://localhost:5131") // allow local frontend dev server
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

//Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

//Use Authentication and Authorization
app.UseAuthentication();
app.UseAuthorization();
//Use CORS
app.UseCors("dev");

app.MapControllers();

app.Run();
