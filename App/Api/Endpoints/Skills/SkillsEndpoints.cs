using Application.Services;

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
        if (projects.IsSuccess)
            return Results.Ok(projects.Value);
        else
            return Results.BadRequest(projects.ToResult());
    }
}
