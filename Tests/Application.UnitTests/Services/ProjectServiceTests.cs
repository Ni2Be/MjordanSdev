using Application.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Model;
using Moq;
using Persistence;
using Xunit.Abstractions;

namespace Application.UnitTests.Services;

public class ProjectServiceTests
{
    private readonly ITestOutputHelper _testOutputHelper;
    private readonly DbContextOptions<DataContext> _dbContextOptions;
    public ProjectServiceTests(ITestOutputHelper testOutputHelper)
    {
        _dbContextOptions = new DbContextOptionsBuilder<DataContext>()
             .UseInMemoryDatabase("InMemoryDb")
             .Options;
        _testOutputHelper = testOutputHelper;
    }

    [Fact]
    public async Task GetAll_Success()
    {
        // arrange
        using (var db = new DataContext(_dbContextOptions))
        {
            List<Project> projects = new List<Project>{new Project()
            {
                Id = Guid.NewGuid(),
                Name = "Project 1",
                Description = "Et eirmod est lorem ut. Labore et est nonumy. Elitr labore vulputate ex feugait blandit eirmod dolor nonummy in eum justo doming lorem sed justo. Et rebum ut wisi. Sanctus illum "
            }};
            await db.Projects.AddRangeAsync(projects);
            await db.SaveChangesAsync();

            var service = new ProjectService(db);

            // act
            var result = await service.GetAll(new CancellationToken());

            // assert
            Assert.NotNull(result);
            Assert.Equal(projects.Count, result.Count);
            Assert.Equal(projects.First().Name, result.First().Name);
            _testOutputHelper.WriteLine($"Expected '{projects.First().Name}' found '{result.First().Name}'.");
        }
    }
}