using Api.Configuration;
using Api.Endpoints.Projects;
using Application.Queries;
using Application.Services;
using DataInjector;
using Infrastructure.Sanitizers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Persistence;
using Path = System.IO.Path;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

// GraphQL
builder.Services.AddGraphQLServer()
                .AddQueryType<mJordansDevQuery>()
                .AddProjections()
                .AddFiltering()
                .AddSorting();
// Add services.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<DataSeeder>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<ISkillService, SkillService>();
builder.Services.AddScoped<IHtmlStringSanitizer, HtmlStringSanitizer>();

builder.Services.AddDbContextFactory<DataContext>(options =>
{
    options.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
});

// Configure CORS
ConfigureCors.Configure(builder);


var app = builder.Build();

// Migrate / Seed Data
ConfigureData.Configure(app);

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
                        Path.Combine(
                            Directory.GetCurrentDirectory(), @"images")
                        ),
    RequestPath = new PathString("/images")
});
app.UseRouting();
if (app.Environment.IsDevelopment())
{
    app.UseCors(ConfigureCors.DevCorsPolicy);
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseCors(ConfigureCors.ProductionCorsPolicy);
}

// Endpoints
app.MapGraphQL();
app.MapProjectEndpoints();
app.MapSkillEndpoints();

app.Run();
