using Microsoft.EntityFrameworkCore;
using MyApp.Application.Interfaces;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.Application.Services;

public class ProduktetService : IProduktetService
{
    private readonly AppDbContext _context;

    public ProduktetService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Produktet>> GetAllAsync()
    {
        return await _context.Produktet.ToListAsync();
    }

    public async Task<Produktet?> GetByIdAsync(int id)
    {
        return await _context.Produktet.FirstOrDefaultAsync(p => p.produkti_id == id);
    }

    public async Task<Produktet?> GetByNameAndCategoryAsync(string emri, string kategoria)
    {
        return await _context.Produktet.FirstOrDefaultAsync(p => p.emri == emri && p.kategoria == kategoria);
    }

    public async Task<Produktet> CreateAsync(Produktet produktet)
    {
        _context.Produktet.Add(produktet);
        await _context.SaveChangesAsync();
        return produktet;
    }

    public async Task UpdateAsync(Produktet produktet)
    {
        _context.Produktet.Update(produktet);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var produktet = await GetByIdAsync(id);
        if (produktet != null)
        {
            _context.Produktet.Remove(produktet);
            await _context.SaveChangesAsync();
        }
    }
}
