using FluentResults;
using Microsoft.EntityFrameworkCore;
using Model;
using Persistence;

namespace Application.Services;
public class SkillService : ISkillService
{
    private readonly DataContext _dataContext;

    public SkillService(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<Result<Guid>> Add(Skill skill, CancellationToken cancellationToken)
    {
        var id = _dataContext.Add(skill).Entity.Id;
        var success = await _dataContext.SaveChangesAsync() > 0;

        if (!success)
            return Result.Fail("Problem saving new Skill");

        return id;
    }

    public async Task<Result<List<Skill>>> GetAll(CancellationToken cancellationToken)
    {
        return await _dataContext.Skills.ToListAsync(cancellationToken);
    }
}
