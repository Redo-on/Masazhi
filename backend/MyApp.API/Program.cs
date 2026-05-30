using Microsoft.EntityFrameworkCore;
using MyApp.Application.Interfaces;
using MyApp.Application.Services;
using MyApp.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();


var connectionString = "Server=localhost;Database=YogaCenterDB;User=root;Password=;";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));


builder.Services.AddScoped<IProduktetService, ProduktetService>();
builder.Services.AddScoped<IShitjetProdukteveService, ShitjetProdukteveService>();
builder.Services.AddScoped<IOrariService, OrariService>();
builder.Services.AddScoped<ISallaService, SallaService>();
builder.Services.AddScoped<IAnetaretService, AnetaretService>();
builder.Services.AddScoped<IInstruktoretService, InstruktoretService>();
builder.Services.AddScoped<IKlasatService, KlasatService>();
builder.Services.AddScoped<IRegjistrimetService, RegjistrimetService>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<IWorkshopService, WorkshopService>();
builder.Services.AddScoped<IRegjistrimiWorkshopService, RegjistrimiWorkshopService>();
builder.Services.AddScoped<IAnetaresimetService, AnetaresimetService>();
builder.Services.AddScoped<IPagesatService, PagesatService>();

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