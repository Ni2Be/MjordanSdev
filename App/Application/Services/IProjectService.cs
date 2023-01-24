using Model;
using FluentResults;

namespace Application.Services;

public interface IProjectService
{
    public Task<Result<List<Project>>> GetAll(CancellationToken cancellationToken);
    public Task<Result<ProjectDetails>> GetDetails(string id, CancellationToken cancellationToken);
    public Task<Result<ImageUrl>> GetImage(string id, string imageName, CancellationToken cancellationToken);
    public Task<Result<string>> Add(Project project, CancellationToken cancellationToken);
}
