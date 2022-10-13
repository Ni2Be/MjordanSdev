using Infrastructure.Sanitizers;
using Microsoft.EntityFrameworkCore;
using Model;
using Persistence;
using Persistence.Migrations;
using System;

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

    public async Task<Guid> Add(Project project, CancellationToken cancellationToken)
    {
        await Task.Run(() =>
        {
            project.ProjectDetails.Description = _htmlStringSanitizer.Sanitize(project.ProjectDetails.Description);
        }, cancellationToken);

        var id = _dataContext.Add(project).Entity.Id;
        var success = await _dataContext.SaveChangesAsync() > 0;
        if (success) 
            return id;

        throw new Exception("Problem saving new Project");
    }

    public async Task<List<Project>> GetAll(CancellationToken cancellationToken)
    {
        return await _dataContext.Projects.ToListAsync(cancellationToken);
    }

    public async Task<ProjectDetails?> GetDetails(Guid id, CancellationToken cancellationToken)
    {
        var projectDetails = await _dataContext.ProjectDetails
                                 .Include(projectDetails => projectDetails.ImageUrls)
                                 .Where(projectDetails => projectDetails.ProjectId == id)
                                 .SingleOrDefaultAsync(cancellationToken);
        return projectDetails;
    }

    public async Task<ImageUrl?> GetImage(Guid id, string imageName, CancellationToken cancellationToken)
    {
        var projectDetails = await _dataContext.ProjectDetails
                                 .Include(projectDetails => projectDetails.ImageUrls)
                                 .Where(projectDetails => projectDetails.ProjectId == id)
                                 .SingleOrDefaultAsync(cancellationToken);
        var image = projectDetails
                                .ImageUrls
                                .Where(imageUrl => imageUrl.Name == imageName)
                                .SingleOrDefault();
        return image;
    }
}
