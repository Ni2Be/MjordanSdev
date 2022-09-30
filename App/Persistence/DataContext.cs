using Microsoft.EntityFrameworkCore;
using Model;

namespace Persistence;
public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<Project> Projects { get; set; }
    public DbSet<ProjectDetails> ProjectDetails { get; set; }
    public DbSet<Skill> Skills { get; set; }
    public DbSet<ImageUrl> ImageUrls { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Project>()
            .HasOne(p => p.ProjectDetails)
            .WithOne(p => p.Project)
            .HasForeignKey<ProjectDetails>(p => p.ProjectId);
    }
}
