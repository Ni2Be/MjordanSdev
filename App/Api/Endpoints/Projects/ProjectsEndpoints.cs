using Application.Services;

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
        if (projects.IsSuccess)
            return Results.Ok(projects.Value);
        else
            return Results.NotFound(projects.ToResult());
    }

    public static async Task<IResult> GetDetails(string id, IProjectService projectService, CancellationToken cancellationToken)
    {
        var project = await projectService.GetDetails(id, cancellationToken);
        if (project.IsSuccess)
            return Results.Ok(project.Value);
        else
            return Results.NotFound(project.ToResult());
    }

    public static async Task<IResult> GetImage(string id, string imageName, IProjectService projectService, CancellationToken cancellationToken)
    {
        var imageUrl = await projectService.GetImage(id, imageName, cancellationToken);
        if (imageUrl.IsSuccess)
            return Results.Ok(imageUrl.Value);
        else
            return Results.NotFound(imageUrl.ToResult());
    }
}
