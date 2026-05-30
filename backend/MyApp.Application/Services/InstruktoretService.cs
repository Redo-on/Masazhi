using Microsoft.EntityFrameworkCore;
using MyApp.Application.Interfaces;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.Application.Services
{
    public class InstruktoretService : IInstruktoretService
    {
        private readonly AppDbContext _context;

        public InstruktoretService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Instruktoret>> GetAllAsync()
        {
            return await _context.Instruktoret.ToListAsync();
        }

        public async Task<Instruktoret?> GetByIdAsync(int id)
        {
            return await _context.Instruktoret.FindAsync(id);
        }

        public async Task<Instruktoret> CreateAsync(Instruktoret instruktor)
        {
            _context.Instruktoret.Add(instruktor);
            await _context.SaveChangesAsync();
            return instruktor;
        }

        public async Task<bool> UpdateAsync(int id, Instruktoret instruktor)
        {
            // Note: Verify if your primary key in Domain/Instruktoret.cs is Id, instruktori_id, etc.
            if (id != instruktor.instruktor_id) return false; 

            _context.Entry(instruktor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InstruktorExists(id)) return false;
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var instruktor = await _context.Instruktoret.FindAsync(id);
            if (instruktor == null) return false;

            _context.Instruktoret.Remove(instruktor);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool InstruktorExists(int id)
        {
            return _context.Instruktoret.Any(e => e.instruktor_id == id);
        }
    }
}