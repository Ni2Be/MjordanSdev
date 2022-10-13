using Model;
using FluentResults;

namespace Application.Services;

public interface IProjectService
{
    public Task<Result<List<Project>>> GetAll(CancellationToken cancellationToken);
    public Task<Result<ProjectDetails>> GetDetails(Guid id, CancellationToken cancellationToken);
    public Task<Result<ImageUrl>> GetImage(Guid id, string imageName, CancellationToken cancellationToken);
    public Task<Result<Guid>> Add(Project project, CancellationToken cancellationToken);
}
