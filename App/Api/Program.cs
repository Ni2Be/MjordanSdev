using Api.Endpoints.Projects;
using Application.Services;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

// Add services.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IProjectService, ProjectService>();

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Endpoints
app.MapProjectEndpoints();

// Seed data
using (var scope = app.Services.CreateScope())
{
    try
    {
        var context = scope.ServiceProvider.GetRequiredService<DataContext>();
        context.Database.Migrate();
        await Seed.SeedData(context);
    }
    catch (Exception e)
    {
        var logger = app.Services.GetRequiredService<ILogger<Program>>();
        logger.LogError(e, "Error during migration");
    }
}

app.Run();
