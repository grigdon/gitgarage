using System.Security.AccessControl;
using CarMaintenance.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CarMaintenance.Api.Data;

public class EntityDbContext: DbContext
{
    public EntityDbContext(DbContextOptions<EntityDbContext> options) : base(options) { }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Car> Cars { get; set; }
    public DbSet<MaintenanceItem> MaintenanceItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configure relationships
        modelBuilder.Entity<Car>()
            .HasOne(c => c.User)
            .WithMany(u => u.Cars)
            .HasForeignKey(c => c.UserId);
            
        modelBuilder.Entity<MaintenanceItem>()
            .HasOne(m => m.Car)
            .WithMany(c => c.MaintenanceItems)
            .HasForeignKey(m => m.CarId);
    }
}