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

    public async Task<List<Project>> GetAll()
    {
        return await _dataContext.Projects.ToListAsync();
    }
}
