using Microsoft.EntityFrameworkCore;
using MyApp.Application.Interfaces;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.Application.Services
{
    public class RegjistrimetService : IRegjistrimetService
    {
        private readonly AppDbContext _context;

        public RegjistrimetService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Regjistrimet>> GetAllAsync()
        {
            return await _context.Regjistrimet.ToListAsync();
        }

        public async Task<Regjistrimet?> GetByIdAsync(int id)
        {
            return await _context.Regjistrimet.FindAsync(id);
        }

        public async Task<Regjistrimet> CreateAsync(Regjistrimet regjistrim)
        {
            _context.Regjistrimet.Add(regjistrim);
            await _context.SaveChangesAsync();
            return regjistrim;
        }

        public async Task<bool> UpdateAsync(int id, Regjistrimet regjistrim)
        {
            // Note: Verify your primary key in Domain/Regjistrimet.cs (Id, regjistrimi_id, etc.)
            if (id != regjistrim.regjistrim_id) return false; 

            _context.Entry(regjistrim).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegjistrimExists(id)) return false;
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var regjistrim = await _context.Regjistrimet.FindAsync(id);
            if (regjistrim == null) return false;

            _context.Regjistrimet.Remove(regjistrim);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool RegjistrimExists(int id)
        {
            return _context.Regjistrimet.Any(e => e.regjistrim_id == id);
        }
    }
}