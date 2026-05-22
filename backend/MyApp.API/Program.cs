using Microsoft.EntityFrameworkCore;
using MyApp.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var connectionString = "Server=localhost;Database=YogaCenterDB;User=root;Password=your_mysql_password_here;";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        connectionString, 
        ServerVersion.AutoDetect(connectionString),
        b => b.MigrationsAssembly("MyApp.Infrastructure") // Tells EF to save migrations in Infrastructure
    ));
var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // This provides the /swagger interface
}

app.UseCors("AllowReact");

app.MapControllers();

app.Run();