using Microsoft.EntityFrameworkCore;
using MyApp.Domain; // Adjust if your entities are inside MyApp.Domain.Entities

namespace MyApp.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options)
        {
        }

        // Map your entities to database tables here:
        public DbSet<Anetaret> Anetaret { get; set; }
        public DbSet<Workshop> Workshops { get; set; }
        public DbSet<Instruktoret> Instruktoret { get; set; }
        public DbSet<Klasat> Klasat { get; set; }
        public DbSet<Anetaresimet> Anetaresimet { get; set; }
    }
}