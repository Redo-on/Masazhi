using Microsoft.EntityFrameworkCore;
using MyApp.Domain;

namespace MyApp.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) 
        : base(options)
    {
    }

    // Core Entities
    public DbSet<Anetaret> Anetaret { get; set; } = null!;
    public DbSet<Instruktoret> Instruktoret { get; set; } = null!;
    public DbSet<Klasat> Klasat { get; set; } = null!;
    public DbSet<Orari> Orari { get; set; } = null!;
    public DbSet<Salla> Sallat { get; set; } = null!;
    public DbSet<Regjistrimet> Regjistrimet { get; set; } = null!;
    public DbSet<Anetaresimet> Anetaresimet { get; set; } = null!;
    public DbSet<Pagesat> Pagesat { get; set; } = null!;
    public DbSet<Workshop> Workshopet { get; set; } = null!;
    public DbSet<Regjistrimi_Workshop> Regjistrimet_Workshop { get; set; } = null!;
    public DbSet<Produktet> Produktet { get; set; } = null!;
    public DbSet<Shitjet_Produkteve> Shitjet_Produkteve { get; set; } = null!;
    public DbSet<User> Users { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Primary Keys
        modelBuilder.Entity<Anetaret>().HasKey(a => a.anetar_id);
        modelBuilder.Entity<Instruktoret>().HasKey(i => i.instruktor_id);
        modelBuilder.Entity<Klasat>().HasKey(k => k.klase_id);
        modelBuilder.Entity<Orari>().HasKey(o => o.orar_id);
        modelBuilder.Entity<Salla>().HasKey(s => s.salla_id);
        modelBuilder.Entity<Regjistrimet>().HasKey(r => r.regjistrim_id);
        modelBuilder.Entity<Anetaresimet>().HasKey(a => a.anetaresimi_id);
        modelBuilder.Entity<Pagesat>().HasKey(p => p.pagese_id);
        modelBuilder.Entity<Workshop>().HasKey(w => w.workshop_id);
        modelBuilder.Entity<Regjistrimi_Workshop>().HasKey(rw => rw.rw_id);
        modelBuilder.Entity<Produktet>().HasKey(p => p.produkti_id);
        modelBuilder.Entity<Shitjet_Produkteve>().HasKey(s => s.shitje_id);

        // Configure Relationships - Foreign Keys
        modelBuilder.Entity<Regjistrimet>()
            .HasOne(r => r.Anetari)
            .WithMany()
            .HasForeignKey(r => r.anetar_id)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Regjistrimet>()
            .HasOne(r => r.Orari)
            .WithMany()
            .HasForeignKey(r => r.orar_id)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Pagesat>()
            .HasOne(p => p.Anetari)
            .WithMany()
            .HasForeignKey(p => p.anetar_id)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Pagesat>()
            .HasOne(p => p.Anetaresimi)
            .WithMany()
            .HasForeignKey(p => p.anetaresim_id)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Shitjet_Produkteve>()
            .HasOne(s => s.Anetari)
            .WithMany()
            .HasForeignKey(s => s.anetar_id)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Shitjet_Produkteve>()
            .HasOne(s => s.Produkti)
            .WithMany(p => p.Shitjet)
            .HasForeignKey(s => s.produkti_id)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Anetaresimet>()
            .HasOne<Anetaret>()
            .WithMany()
            .HasForeignKey(a => a.anetar_id)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure Decimal Precision
        modelBuilder.Entity<Produktet>()
            .Property(p => p.cmimi).HasPrecision(18, 2);

        modelBuilder.Entity<Shitjet_Produkteve>()
            .Property(s => s.cmimi_total).HasPrecision(18, 2);

        modelBuilder.Entity<Pagesat>()
            .Property(p => p.shuma).HasPrecision(18, 2);

        modelBuilder.Entity<Anetaresimet>()
            .Property(a => a.cmimi).HasPrecision(18, 2);

        modelBuilder.Entity<Workshop>()
            .Property(w => w.cmimi).HasPrecision(18, 2);

        modelBuilder.Entity<Instruktoret>()
            .Property(i => i.tarifa_orare).HasPrecision(18, 2);
    }
}