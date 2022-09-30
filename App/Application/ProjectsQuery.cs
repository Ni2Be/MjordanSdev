using Application.Services;
using HotChocolate;
using Model;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application;

public class ProjectsQuery
{
    private readonly DataContext _dataContext;
    public ProjectsQuery(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Project> Projects([Service] DataContext dataContext) => dataContext.Projects;
}