using Api.Endpoints.Projects;
using Application.Queries;
using Application.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Model;
using Persistence;
using Path = System.IO.Path;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

// GraphQL
builder.Services.AddGraphQLServer()
                .AddQueryType<ProjectsQuery>()
                .AddProjections()
                .AddFiltering()
                .AddSorting();
// Add services.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<ISkillService, SkillService>();

builder.Services.AddDbContextFactory<DataContext>(options =>
{
    options.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
});

var productionCorsPolicy = "productionCorsPolicy"; 
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: productionCorsPolicy,
                      policy =>
                      {
                          policy.WithOrigins("https://mjordans.dev",
                                              "https://www.mjordans.dev");
                      });
});
var devCorsPolicy = "devCorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: devCorsPolicy, builder => {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors(devCorsPolicy);
    app.UseSwagger();
    app.UseSwaggerUI();
} else
{
    app.UseCors(productionCorsPolicy);
}

app.UseHttpsRedirection();
app.UseStaticFiles(new StaticFileOptions()
{
    FileProvider = new PhysicalFileProvider(
                        Path.Combine(
                            Directory.GetCurrentDirectory(), @"images")
                        ),
    RequestPath = new PathString("/images")
});

// Endpoints
app.UseRouting();
app.MapGraphQL();
app.MapProjectEndpoints();
app.MapSkillEndpoints();

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
