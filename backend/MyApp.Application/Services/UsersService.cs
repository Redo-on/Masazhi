using Microsoft.EntityFrameworkCore;
using MyApp.Application.Interfaces;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.Application.Services
{
    public class UsersService : IUsersService
    {
        private readonly AppDbContext _context;

        public UsersService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            // Changed from .User to .Users
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            // Changed from .User to .Users
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> CreateAsync(User user)
        {
            // Changed from .User to .Users
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> UpdateAsync(int id, User user)
        {
            if (id != user.Id) return false; 

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id)) return false;
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            // Changed from .User to .Users
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool UserExists(int id)
        {
            // Changed from .User to .Users
            return _context.Users.Any(e => e.Id == id);
        }
    }
}