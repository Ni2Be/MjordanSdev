namespace Api.Configuration;

internal static class ConfigureCors
{
    internal const string ProductionCorsPolicy = "ProductionCorsPolicy";
    internal const string DevCorsPolicy = "DevCorsPolicy";
    internal static void Configure(WebApplicationBuilder builder)
    {
        builder.Services.AddCors(options =>
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
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: DevCorsPolicy, builder => {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            });
        });
    }
}
