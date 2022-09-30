using Microsoft.EntityFrameworkCore;
using Model;
using Persistence;
using System;

namespace Application.Services;
public class ProjectService : IProjectService
{
    private readonly DataContext _dataContext;

    public ProjectService(DataContext dataContext)
    {
        _dataContext = dataContext;
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
