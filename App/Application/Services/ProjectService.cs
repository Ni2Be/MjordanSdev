using FluentResults;
using Infrastructure.Sanitizers;
using Microsoft.EntityFrameworkCore;
using Model;
using Persistence;

namespace Application.Services;
public class ProjectService : IProjectService
{
    private readonly DataContext _dataContext;
    private readonly IHtmlStringSanitizer _htmlStringSanitizer;

    public ProjectService(DataContext dataContext, IHtmlStringSanitizer htmlStringSanitizer)
    {
        _dataContext = dataContext;
        _htmlStringSanitizer = htmlStringSanitizer;
    }

    public async Task<Result<Guid>> Add(Project project, CancellationToken cancellationToken)
    {
        await Task.Run(() =>
        {
            project.ProjectDetails.Description = _htmlStringSanitizer.Sanitize(project.ProjectDetails.Description);
        }, cancellationToken);

        var id = _dataContext.Add(project).Entity.Id;
        var success = await _dataContext.SaveChangesAsync() > 0;

        if (!success)
            return Result.Fail("Problem saving new Project");

        return id;
    }

    public async Task<Result<List<Project>>> GetAll(CancellationToken cancellationToken)
    {
        return await _dataContext.Projects.ToListAsync(cancellationToken);
    }

    public async Task<Result<ProjectDetails>> GetDetails(Guid id, CancellationToken cancellationToken)
    {
        var projectDetails = await _dataContext.ProjectDetails
                                 .Include(projectDetails => projectDetails.ImageUrls)
                                 .Where(projectDetails => projectDetails.ProjectId == id)
                                 .SingleOrDefaultAsync(cancellationToken);

        if (projectDetails is null)
            return Result.Fail("Project not found.");

        return projectDetails;
    }

    public async Task<Result<ImageUrl>> GetImage(Guid id, string imageName, CancellationToken cancellationToken)
    {
        var projectDetails = await _dataContext.ProjectDetails
                                 .Include(projectDetails => projectDetails.ImageUrls)
                                 .Where(projectDetails => projectDetails.ProjectId == id)
                                 .SingleOrDefaultAsync(cancellationToken);

        if (projectDetails is null)
            return Result.Fail("Project not found.");

        var image = projectDetails
                                .ImageUrls
                                .Where(imageUrl => imageUrl.Name == imageName)
                                .SingleOrDefault();

        if (image is null)
            return Result.Fail("Image not found.");

        return image;
    }
}
