using Application.Services;
using Microsoft.AspNetCore.Authorization;
using static System.Net.Mime.MediaTypeNames;

namespace Api.Endpoints.Projects;

public static class ProjectEndpoints
{
    public static void MapProjectEndpoints(this WebApplication app)
    {
        app.MapGet("projects/list", GetAllProjects);
        app.MapGet("projects/{id}", GetDetails);
        app.MapGet("projects/{id}/image/{imageName}", GetImage);
    }

    public static async Task<IResult> GetAllProjects(IProjectService projectService, CancellationToken cancellationToken)
    {
        var projects = await projectService.GetAll(cancellationToken);
        return Results.Ok(projects);
    }
    public static async Task<IResult> GetDetails(string id, IProjectService projectService, CancellationToken cancellationToken)
    {
        var project = await projectService.GetDetails(Guid.Parse(id), cancellationToken);
        return Results.Ok(project);
    }
    public static async Task<IResult> GetImage(string id, string imageName, IProjectService projectService, CancellationToken cancellationToken)
    {
        var imageUrl = await projectService.GetImage(Guid.Parse(id), imageName, cancellationToken);
        return Results.Ok(imageUrl);
    }
}
