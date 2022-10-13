using Application.Services;
using Infrastructure.Sanitizers;
using Microsoft.EntityFrameworkCore;
using Model;
using Moq;
using Persistence;
using Xunit.Abstractions;

namespace Application.UnitTests.Services;

public class ProjectServiceTests
{
    private readonly ITestOutputHelper _testOutputHelper;
    private readonly DbContextOptions<DataContext> _dbContextOptions;
    private readonly Mock<IHtmlStringSanitizer> _htmlStringSanitizer;
    public ProjectServiceTests(ITestOutputHelper testOutputHelper)
    {
        _dbContextOptions = new DbContextOptionsBuilder<DataContext>()
             .UseInMemoryDatabase("InMemoryDb")
             .Options;
        _testOutputHelper = testOutputHelper;
        _htmlStringSanitizer = new Mock<IHtmlStringSanitizer>();
        _htmlStringSanitizer.Setup(s => s.Sanitize("")).Returns("");
    }

    [Fact]
    public async Task GetAll_Success()
    {
        // arrange
        using (var db = new DataContext(_dbContextOptions))
        {
            List<Project> projects = new List<Project>{new Project
            {
                Id = Guid.NewGuid(),
                Name = "Project 1"
            }};
            await db.Projects.AddRangeAsync(projects);
            await db.SaveChangesAsync();

            var service = new ProjectService(db, _htmlStringSanitizer.Object);

            // act
            var result = await service.GetAll(new CancellationToken());

            // assert
            Assert.NotNull(result);
            Assert.Equal(projects.Count, result.Value.Count);
            Assert.Equal(projects.First().Name, result.Value.First().Name);
            _testOutputHelper.WriteLine($"Expected '{projects.First().Name}' found '{result.Value.First().Name}'.");
        }
    }
}