using Microsoft.EntityFrameworkCore;
using MyApp.Application.Interfaces;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.Application.Services
{
    public class KlasatService : IKlasatService
    {
        private readonly AppDbContext _context;

        public KlasatService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Klasat>> GetAllAsync()
        {
            return await _context.Klasat.ToListAsync();
        }

        public async Task<Klasat?> GetByIdAsync(int id)
        {
            return await _context.Klasat.FindAsync(id);
        }

        public async Task<Klasat> CreateAsync(Klasat klasa)
        {
            _context.Klasat.Add(klasa);
            await _context.SaveChangesAsync();
            return klasa;
        }

        public async Task<bool> UpdateAsync(int id, Klasat klasa)
        {
            // Note: Verify your primary key in Domain/Klasat.cs (Id, klasa_id, etc.)
            if (id != klasa.klase_id) return false; 

            _context.Entry(klasa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KlasaExists(id)) return false;
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var klasa = await _context.Klasat.FindAsync(id);
            if (klasa == null) return false;

            _context.Klasat.Remove(klasa);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool KlasaExists(int id)
        {
            return _context.Klasat.Any(e => e.klase_id == id);
        }
    }
}