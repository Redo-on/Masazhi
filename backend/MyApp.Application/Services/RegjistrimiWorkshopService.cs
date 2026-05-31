using Microsoft.EntityFrameworkCore;
using MyApp.Application.Interfaces;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.Application.Services
{
    public class RegjistrimiWorkshopService : IRegjistrimiWorkshopService
    {
        private readonly AppDbContext _context;

        public RegjistrimiWorkshopService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Regjistrimi_Workshop>> GetAllAsync()
        {
            return await _context.Regjistrimet_Workshop.ToListAsync();
        }

        public async Task<Regjistrimi_Workshop?> GetByIdAsync(int id)
        {
            return await _context.Regjistrimet_Workshop.FindAsync(id);
        }

        public async Task<Regjistrimi_Workshop> CreateAsync(Regjistrimi_Workshop regjistrimi)
        {
            _context.Regjistrimet_Workshop.Add(regjistrimi);
            await _context.SaveChangesAsync();
            return regjistrimi;
        }

        public async Task<bool> UpdateAsync(int id, Regjistrimi_Workshop regjistrimi)
        {
            // Matched with rw_id primary key from AppDbContext configuration
            if (id != regjistrimi.rw_id) return false;

            _context.Entry(regjistrimi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegjistrimiExists(id)) return false;
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var regjistrimi = await _context.Regjistrimet_Workshop.FindAsync(id);
            if (regjistrimi == null) return false;

            _context.Regjistrimet_Workshop.Remove(regjistrimi);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool RegjistrimiExists(int id)
        {
            return _context.Regjistrimet_Workshop.Any(e => e.rw_id == id);
        }

        public Task<IEnumerable<Regjistrimi_Workshop>> GetByAnetarAsync(int anetarId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Regjistrimi_Workshop>> GetByWorkshopAsync(int workshopId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Regjistrimi_Workshop regjistrim)
        {
            throw new NotImplementedException();
        }

        Task IRegjistrimiWorkshopService.DeleteAsync(int id)
        {
            return DeleteAsync(id);
        }
    }
}