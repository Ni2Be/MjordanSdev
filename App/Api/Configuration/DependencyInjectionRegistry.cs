﻿using Application.Services;
using DataInjector;
using Infrastructure.Email;
using Infrastructure.Sanitizers;
using Persistence;

namespace Api.Configuration;

public static class DependencyInjectionRegistry
{
    public static IServiceCollection AddServices(IServiceCollection services, IConfiguration configuraiton, bool isDevelopment)
    {
        services.Configure<EmailConfiguration>(configuraiton.GetSection("EmailConfiguration"));
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IContactService, ContactService>();
        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<ISkillService, SkillService>();
        services.Configure<HtmlStringSanitizerOptoins>(configuraiton.GetSection("HtmlStringSanitizerOptoins"));
        services.AddScoped<IHtmlStringSanitizer, HtmlStringSanitizer>();

        services.AddScoped(provider =>
                            new DataSeeder(provider.GetService<DataContext>(),
                                           provider.GetService<IProjectService>(),
                                           provider.GetService<ISkillService>(),
                                           isDevelopment));


        return services;
    }
}
