using Model;

namespace Application.Services;

public interface ISkillService
{
    public Task<List<Skill>> GetAll(CancellationToken cancellationToken);
}
