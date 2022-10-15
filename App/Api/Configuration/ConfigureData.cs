using DataInjector;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Api.Configuration;

public static class ConfigureData
{
    public static async void Configure(WebApplication app)
    {
        // Migrate data
        using (var scope = app.Services.CreateScope())
        {
            try
            {
                var context = scope.ServiceProvider.GetRequiredService<DataContext>();
                context.Database.Migrate();
            }
            catch (Exception e)
            {
                var logger = app.Services.GetRequiredService<ILogger<Program>>();
                logger.LogError(e, "Error during migration");
            }
        }
        // Seed data
        using (var scope = app.Services.CreateScope())
        {
            try
            {
                var dataSeeder = scope.ServiceProvider.GetRequiredService<DataSeeder>();
                await dataSeeder.SeedData();
            }
            catch (Exception e)
            {
                var logger = app.Services.GetRequiredService<ILogger<Program>>();
                logger.LogError(e, "Error during seeding");
            }
        }
    }
}
