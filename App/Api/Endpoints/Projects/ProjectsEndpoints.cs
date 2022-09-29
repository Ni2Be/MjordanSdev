using Application.Services;
using Microsoft.AspNetCore.Authorization;
using static System.Net.Mime.MediaTypeNames;

namespace Api.Endpoints.Projects;

public static class ProjectEndpoints
{
    public static void MapProjectEndpoints(this WebApplication app)
    {
        app.MapGet("projects/list", GetAllProjects);
    }

    
    public static async Task<IResult> GetAllProjects(IProjectService projectService, CancellationToken cancellationToken)
    {
        var projects = await projectService.GetAll(cancellationToken);
        return Results.Ok(projects);
    }
}
