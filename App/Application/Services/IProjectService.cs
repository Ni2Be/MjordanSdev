using Model;

namespace Application.Services;

public interface IProjectService
{
    public Task<List<Project>> GetAll(CancellationToken cancellationToken);
}
