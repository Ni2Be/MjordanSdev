using Serilog;

namespace Api.Configuration;

internal static class ConfigureCors
{
    internal const string ProductionCorsPolicy = "ProductionCorsPolicy";
    internal const string DevCorsPolicy = "DevCorsPolicy";
    internal static IServiceCollection Configure(IServiceCollection services, IConfiguration configuraiton)
    {
        var origins = configuraiton.GetValue<string>("AllowedOrigins").Split(";");
        Log.Logger.Information("AllowedOrigins: " + string.Join(", ", origins));
        services.AddCors(options =>
        {
            options.AddPolicy(name: ProductionCorsPolicy,
                              policy =>
                              {
                                  policy
                                      .WithOrigins(origins)
                                      .AllowAnyMethod()
                                      .AllowCredentials()
                                      .AllowAnyHeader();
                              });
        });
        services.AddCors(options =>
        {
            options.AddPolicy(name: DevCorsPolicy, builder => {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            });
        });

        return services;
    }
}
