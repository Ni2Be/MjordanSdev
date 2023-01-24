using Api.Configuration;
using Api.Endpoints.Contact;
using Api.Endpoints.Projects;
using Application.Queries;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Persistence;
using Serilog;
using Path = System.IO.Path;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

// Logging
const string template = "{Timestamp:yyyy-MM-dd HH:mm:ss} [{Level}] {Indent:l}{NewLine}{Message}{NewLine}{Exception}";
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console(outputTemplate: template)
    .CreateBootstrapLogger();
builder.Host.UseSerilog();

// Docker Helper
configuration.AddJsonFile("/run/secrets/mjordansdev_secrets", optional: true);

// GraphQL
builder.Services.AddGraphQLServer()
                .AddQueryType<mJordansDevQuery>()
                .AddProjections()
                .AddFiltering()
                .AddSorting();

// Add services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContextFactory<DataContext>(options =>
{
    options.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
});
ConfigureServices.AddServices(builder.Services, configuration, builder.Environment.IsDevelopment());

// Configure CORS
ConfigureCors.Configure(builder.Services, builder.Configuration);

var app = builder.Build();

// Migrate / Seed Data
await ConfigureData.Configure(app);

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
app.UseSwagger();
app.UseSwaggerUI();
if (app.Environment.IsDevelopment())
{
    app.UseCors(ConfigureCors.DevCorsPolicy);
}
else
{
    app.UseCors(ConfigureCors.ProductionCorsPolicy);
}

// Endpoints
app.MapGraphQL();
app.MapProjectEndpoints();
app.MapSkillEndpoints();
app.MapContactEndpoints();

app.Run();
