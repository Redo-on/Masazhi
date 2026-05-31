using Microsoft.EntityFrameworkCore;
using MyApp.Application.Interfaces;
using MyApp.Domain;
using MyApp.Infrastructure;
using MyApp.Infrastructure.Data;

namespace MyApp.Application.Services;

public class OrariService : IOrariService
{
    private readonly AppDbContext _context;

    public OrariService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Orari>> GetAllAsync()
    {
        return await _context.Orari.ToListAsync();
    }

    public async Task<Orari?> GetByIdAsync(int id)
    {
        return await _context.Orari.FindAsync(id);
    }

    public async Task<Orari> CreateAsync(Orari orari)
    {
        _context.Orari.Add(orari);
        await _context.SaveChangesAsync();

        return orari;
    }

    public async Task<bool> UpdateAsync(int id, Orari orari)
    {
        var existing = await _context.Orari.FindAsync(id);

        if (existing == null)
            return false;

        existing.klasa_id = orari.klasa_id;
        existing.dita_javes = orari.dita_javes;
        existing.ora_fillimit = orari.ora_fillimit;
        existing.ora_perfundimit = orari.ora_perfundimit;
        existing.salla_id = orari.salla_id;
        existing.statusi = orari.statusi;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var orari = await _context.Orari.FindAsync(id);

        if (orari == null)
            return false;

        _context.Orari.Remove(orari);

        await _context.SaveChangesAsync();

        return true;
    }
}