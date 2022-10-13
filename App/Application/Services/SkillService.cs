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

    public async Task<Result<List<Skill>>> GetAll(CancellationToken cancellationToken)
    {
        return await _dataContext.Skills.ToListAsync(cancellationToken);
    }
}
