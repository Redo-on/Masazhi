using Microsoft.EntityFrameworkCore;
using MyApp.Application.Interfaces;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.Application.Services;

public class ShitjetProdukteveService : IShitjetProdukteveService
{
    private readonly AppDbContext _context;

    public ShitjetProdukteveService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Shitjet_Produkteve>> GetAllAsync()
    {
        return await _context.Shitjet_Produkteve
            .Include(s => s.Anetari)
            .Include(s => s.Produkti)
            .ToListAsync();
    }

    public async Task<Shitjet_Produkteve?> GetByIdAsync(int id)
    {
        return await _context.Shitjet_Produkteve
            .Include(s => s.Anetari)
            .Include(s => s.Produkti)
            .FirstOrDefaultAsync(s => s.shitje_id == id);
    }

    public async Task<IEnumerable<Shitjet_Produkteve>> GetByAnetarAsync(int anetarId)
    {
        return await _context.Shitjet_Produkteve
            .Include(s => s.Anetari)
            .Include(s => s.Produkti)
            .Where(s => s.anetar_id == anetarId)
            .ToListAsync();
    }

    public async Task<IEnumerable<Shitjet_Produkteve>> GetByProduktetAsync(int produktiId)
    {
        return await _context.Shitjet_Produkteve
            .Include(s => s.Anetari)
            .Include(s => s.Produkti)
            .Where(s => s.produkti_id == produktiId)
            .ToListAsync();
    }

    public async Task<Shitjet_Produkteve> CreateAsync(Shitjet_Produkteve shitje)
    {
        _context.Shitjet_Produkteve.Add(shitje);
        await _context.SaveChangesAsync();
        return shitje;
    }

    public async Task UpdateAsync(Shitjet_Produkteve shitje)
    {
        _context.Shitjet_Produkteve.Update(shitje);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var shitje = await GetByIdAsync(id);
        if (shitje != null)
        {
            _context.Shitjet_Produkteve.Remove(shitje);
            await _context.SaveChangesAsync();
        }
    }
}
