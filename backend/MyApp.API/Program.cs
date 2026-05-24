using Microsoft.EntityFrameworkCore;
using MyApp.Application.Interfaces;
using MyApp.Application.Services;
using MyApp.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Using your hardcoded connection string inside your colleague's setup
var connectionString = "Server=localhost;Database=YogaCenterDB;User=root;Password=;";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Register Services (Colleague's additions)
builder.Services.AddScoped<IProduktetService, ProduktetService>();
builder.Services.AddScoped<IShitjetProdukteveService, ShitjetProdukteveService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy
            .WithOrigins("http://localhost:5173") // Standard Vite/React port
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Auto-migrate database (Colleague's addition)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReact");
app.MapControllers();

app.Run();