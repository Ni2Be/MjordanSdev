using Application.Services;
using Microsoft.AspNetCore.Authorization;

namespace Api.Endpoints.Projects;

public static class ProjectEndpoints
{
    public static void MapProjectEndpoints(this WebApplication app)
    {
        app.MapGet("projects", GetAllProjects);
    }

    
    public static async Task<IResult> GetAllProjects(IProjectService projectService)
    {
        var projects = await projectService.GetAll();
        return Results.Ok(projects);
    }
}
