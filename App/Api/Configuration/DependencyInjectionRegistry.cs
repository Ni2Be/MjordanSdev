﻿using Application.Services;
using DataInjector;
using Infrastructure.Sanitizers;
using Persistence;

namespace Api.Configuration;

public static class DependencyInjectionRegistry
{
    public static IServiceCollection AddServices(IServiceCollection services, bool isDevelopment)
    {
        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<ISkillService, SkillService>();
        services.AddScoped<IHtmlStringSanitizer, HtmlStringSanitizer>();
        services.AddScoped(provider => 
                            new DataSeeder(provider.GetService<DataContext>(),
                                           provider.GetService<IProjectService>(),
                                           provider.GetService<ISkillService>(), 
                                           isDevelopment));

        return services;
    }
}
