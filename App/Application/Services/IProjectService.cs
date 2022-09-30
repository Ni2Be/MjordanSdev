using Model;

namespace Application.Services;

public interface IProjectService
{
    public Task<List<Project>> GetAll(CancellationToken cancellationToken);
    public Task<ProjectDetails?> GetDetails(Guid id, CancellationToken cancellationToken);
    public Task<ImageUrl?> GetImage(Guid id, string imageName, CancellationToken cancellationToken);
}
