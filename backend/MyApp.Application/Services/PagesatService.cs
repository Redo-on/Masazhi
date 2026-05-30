using Microsoft.EntityFrameworkCore;
using MyApp.Application.Interfaces;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.Application.Services
{
    public class PagesatService : IPagesatService
    {
        private readonly AppDbContext _context;

        public PagesatService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Pagesat>> GetAllAsync()
        {
            return await _context.Pagesat.ToListAsync();
        }

        public async Task<Pagesat?> GetByIdAsync(int id)
        {
            return await _context.Pagesat.FindAsync(id);
        }

        public async Task<Pagesat> CreateAsync(Pagesat pagesa)
        {
            _context.Pagesat.Add(pagesa);
            await _context.SaveChangesAsync();
            return pagesa;
        }

        public async Task<bool> UpdateAsync(int id, Pagesat pagesa)
        {
            // Matched with pagesa_id primary key - update if your domain uses a different property name!
            if (id != pagesa.pagese_id) return false;

            _context.Entry(pagesa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PagesaExists(id)) return false;
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var pagesa = await _context.Pagesat.FindAsync(id);
            if (pagesa == null) return false;

            _context.Pagesat.Remove(pagesa);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool PagesaExists(int id)
        {
            return _context.Pagesat.Any(e => e.pagese_id == id);
        }
    }
}