namespace Api.Configuration;

internal static class ConfigureCors
{
    internal const string ProductionCorsPolicy = "ProductionCorsPolicy";
    internal const string DevCorsPolicy = "DevCorsPolicy";
    internal static IServiceCollection Configure(IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(name: ProductionCorsPolicy,
                              policy =>
                              {
                                  policy
                                      .WithOrigins("https://mjordans.dev",
                                                   "https://www.mjordans.dev")
                                      .AllowAnyMethod()
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
