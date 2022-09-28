using Application.Services;
using Microsoft.AspNetCore.Authorization;

namespace Api.Endpoints.Projects;

public static class SkillEndpoints
{
    public static void MapSkillEndpoints(this WebApplication app)
    {
        app.MapGet("skills/list", GetAllSkills);
    }

    
    public static async Task<IResult> GetAllSkills(ISkillService skillService, CancellationToken cancellationToken)
    {
        var projects = await skillService.GetAll(cancellationToken);
        return Results.Ok(projects);
    }
}
