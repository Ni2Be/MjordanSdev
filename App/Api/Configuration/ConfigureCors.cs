namespace Api.Configuration;

public static class ConfigureCors
{
    public const string ProductionCorsPolicy = "ProductionCorsPolicy";
    public const string DevCorsPolicy = "DevCorsPolicy";
    public static void Configure(WebApplicationBuilder builder)
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
