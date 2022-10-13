using FluentResults;
using Model;

namespace Application.Services;

public interface ISkillService
{
    public Task<Result<List<Skill>>> GetAll(CancellationToken cancellationToken);
}
