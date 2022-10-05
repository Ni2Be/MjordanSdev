using Application.Services;
using HotChocolate;
using Model;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries;

public partial class mJordansDevQuery
{
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Skill> Skills([Service] DataContext dataContext) 
        => dataContext.Skills;
}