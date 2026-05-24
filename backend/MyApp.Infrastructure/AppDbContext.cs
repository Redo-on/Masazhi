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
        public DbSet<Workshop> Workshop { get; set; }
        public DbSet<Instruktoret> Instruktoret { get; set; }
        public DbSet<Klasat> Klasat { get; set; }
        public DbSet<Anetaresimet> Anetaresimet { get; set; }
        public DbSet<Orari> Orari { get; set; }
        public DbSet<Salla> Salla { get; set; }
        public DbSet<Regjistrimi_Workshop> Regjistrimi_Workshop { get; set; }
        public DbSet<Produktet> Produktet { get; set; }
        public DbSet<Shitjet_Produkteve> Shitjet_Produkteve { get; set; }

    }
}