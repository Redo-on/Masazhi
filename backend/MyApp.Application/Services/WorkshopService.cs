using Microsoft.EntityFrameworkCore;
using MyApp.Application.Interfaces;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.Application.Services
{
    public class WorkshopService : IWorkshopService
    {
        private readonly AppDbContext _context;

        public WorkshopService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Workshop>> GetAllAsync()
        {
            return await _context.Workshopet.ToListAsync();
        }

        public async Task<Workshop?> GetByIdAsync(int id)
        {
            return await _context.Workshopet.FindAsync(id);
        }

        public async Task<Workshop> CreateAsync(Workshop workshop)
        {
            _context.Workshopet.Add(workshop);
            await _context.SaveChangesAsync();
            return workshop;
        }

        public async Task<bool> UpdateAsync(int id, Workshop workshop)
        {
            // Matched with workshop_id primary key from AppDbContext configuration
            if (id != workshop.workshop_id) return false;

            _context.Entry(workshop).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkshopExists(id)) return false;
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var workshop = await _context.Workshopet.FindAsync(id);
            if (workshop == null) return false;

            _context.Workshopet.Remove(workshop);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool WorkshopExists(int id)
        {
            return _context.Workshopet.Any(e => e.workshop_id == id);
        }

        public Task UpdateAsync(Workshop workshop)
        {
            throw new NotImplementedException();
        }

        Task IWorkshopService.DeleteAsync(int id)
        {
            return DeleteAsync(id);
        }
    }
}