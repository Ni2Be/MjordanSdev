using HotChocolate;
using Model;
using Persistence;

namespace Application.Queries;

public partial class mJordansDevQuery
{
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Skill> Skills([Service] DataContext dataContext) 
        => dataContext.Skills;
}