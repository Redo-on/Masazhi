using Microsoft.EntityFrameworkCore;
using MyApp.Domain;
using MyApp.Application.Interfaces;
using MyApp.Infrastructure.Data;

namespace MyApp.Application.Services
{
    public class AnetaretService : IAnetaretService
    {
        private readonly AppDbContext _context;

        // The Service takes control of the Database Context
        public AnetaretService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Anetaret>> GetAllAsync()
        {
            return await _context.Anetaret.ToListAsync();
        }

        public async Task<Anetaret?> GetByIdAsync(int id)
        {
            return await _context.Anetaret.FindAsync(id);
        }

        public async Task<Anetaret> CreateAsync(Anetaret anetar)
        {
            _context.Anetaret.Add(anetar);
            await _context.SaveChangesAsync();
            return anetar;
        }

        public async Task<bool> UpdateAsync(int id, Anetaret anetar)
        {
            // Note: Verify if your primary key is AnetariId, anetar_id, or Id in your Domain model
            if (id != anetar.anetar_id) return false; 

            _context.Entry(anetar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnetarExists(id)) return false;
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var anetar = await _context.Anetaret.FindAsync(id);
            if (anetar == null) return false;

            _context.Anetaret.Remove(anetar);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool AnetarExists(int id)
        {
            return _context.Anetaret.Any(e => e.anetar_id == id);
        }
    }
}