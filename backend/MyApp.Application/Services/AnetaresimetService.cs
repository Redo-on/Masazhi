using Microsoft.EntityFrameworkCore;
using MyApp.Application.Interfaces;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.Application.Services
{
    public class AnetaresimetService : IAnetaresimetService
    {
        private readonly AppDbContext _context;

        public AnetaresimetService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Anetaresimet>> GetAllAsync()
        {
            return await _context.Anetaresimet.ToListAsync();
        }

        public async Task<Anetaresimet?> GetByIdAsync(int id)
        {
            return await _context.Anetaresimet.FindAsync(id);
        }

        public async Task<Anetaresimet> CreateAsync(Anetaresimet anetaresimi)
        {
            _context.Anetaresimet.Add(anetaresimi);
            await _context.SaveChangesAsync();
            return anetaresimi;
        }

        public async Task<bool> UpdateAsync(int id, Anetaresimet anetaresimi)
        {
            // Matched with anetaresim_id primary key - update if your domain uses a different property name!
            if (id != anetaresimi.anetaresimi_id) return false;

            _context.Entry(anetaresimi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnetaresimiExists(id)) return false;
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var anetaresimi = await _context.Anetaresimet.FindAsync(id);
            if (anetaresimi == null) return false;

            _context.Anetaresimet.Remove(anetaresimi);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool AnetaresimiExists(int id)
        {
            return _context.Anetaresimet.Any(e => e.anetaresimi_id == id);
        }
    }
}