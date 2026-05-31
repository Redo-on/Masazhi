using Microsoft.EntityFrameworkCore;
using MyApp.Application.Interfaces;
using MyApp.Domain;
using MyApp.Infrastructure;
using MyApp.Infrastructure.Data;

namespace MyApp.Application.Services;

public class SallaService : ISallaService
{
    private readonly AppDbContext _context;

    public SallaService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Salla>> GetAllAsync()
    {
        return await _context.Sallat.ToListAsync();
    }

    public async Task<Salla?> GetByIdAsync(int id)
    {
        return await _context.Sallat.FindAsync(id);
    }

    public async Task<Salla> CreateAsync(Salla salla)
    {
        _context.Sallat.Add(salla);

        await _context.SaveChangesAsync();

        return salla;
    }

    public async Task<bool> UpdateAsync(int id, Salla salla)
    {
        var existing = await _context.Sallat.FindAsync(id);

        if (existing == null)
            return false;

        existing.emri = salla.emri;
        existing.kapaciteti = salla.kapaciteti;
        existing.pajisjet = salla.pajisjet;
        existing.pershkrimi = salla.pershkrimi;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var salla = await _context.Sallat.FindAsync(id);

        if (salla == null)
            return false;

        _context.Sallat.Remove(salla);

        await _context.SaveChangesAsync();

        return true;
    }
}