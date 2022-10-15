using HotChocolate;
using Model;
using Persistence;

namespace Application.Queries;

public partial class mJordansDevQuery
{
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Project> Projects([Service] DataContext dataContext) 
        => dataContext.Projects;
}