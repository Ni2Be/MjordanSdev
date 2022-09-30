using Model;
using static System.Net.Mime.MediaTypeNames;

namespace Persistence;
public static class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if (!context.Projects.Any())
        {
            var projects = new List<Project> {
            new Project {
                Name = "Dummy Project 1",
                ProjectDetails = new ProjectDetails
                {
                    Description = "Elitr ea elitr duis erat est soluta et eos ut duis ipsum. Sed qui erat ut diam dolores dolore diam rebum sed lorem ut duo augue ut consequat. Eu elit amet diam et erat sit odio aliquyam duis nonumy autem sit takimata lorem adipiscing et. Dolor lorem sit. Facer diam eos erat no eum et. Ut at in et sanctus sit clita sed eros sed. Dolore tation esse sadipscing possim dolor. Amet amet erat qui et congue takimata odio consetetur diam duo lorem et dolor. Vel eos rebum nonumy magna dolor lorem sit sed. Gubergren et dolor ut est et nobis sed dolore autem sed voluptua takimata.",
                    BulletPoints = "some;bullet;points",
                    ImageUrls = new List<ImageUrl>{
                        new ("preview_image", "images/projects/logo.png"),
                        new ("details_image_0", "images/projects/git logo.png"),
                        new ("details_image_1", "images/projects/logo.png")
                    }
                }
            },
            new Project {
                Name = "Dummy Project 2",
                ProjectDetails = new ProjectDetails
                {
                    Description = "Elitr ea elitr duis erat est soluta et eos ut duis ipsum. Sed qui erat ut diam dolores dolore diam rebum sed lorem ut duo augue ut consequat.",
                    BulletPoints = "some other;bullet;points",
                    ImageUrls = new List<ImageUrl>{
                        new ("preview_image", "images/projects/logo.png"),
                        new ("details_image_0", "images/projects/git logo.png"),
                        new ("details_image_1", "images/projects/logo.png")
                    }
                }
            },
            new Project {
                Name = "Dummy Project 3",
                ProjectDetails = new ProjectDetails
                {
                    Description = "Elitr ea elitr duis erat est soluta et eos ut duis ipsum. Sed qui erat ut diam dolores dolore diam rebum sed lorem ut duo augue ut consequat. Eu elit amet diam et erat sit odio aliquyam duis nonumy autem sit takimata lorem adipiscing et. Dolor lorem sit. Facer diam eos erat no eum et. ",
                    BulletPoints = "some third;bullet;points",
                    ImageUrls = new List<ImageUrl>{
                        new ("preview_image", "images/projects/logo.png"),
                        new ("details_image_0", "images/projects/git logo.png"),
                        new ("details_image_1", "images/projects/logo.png")
                    }
                }
            },
            };

            await context.Projects.AddRangeAsync(projects);
            await context.SaveChangesAsync();
        }

        if (!context.Skills.Any())
        {
            var skills = new List<Skill> {
            new Skill { Name = "WiX", Description = "WiX is a set of tools to create Windows installers.", Value = 70 },
            new Skill { Name = ".Net", Description = ".Net is a solid backend that can run on Windows and Linux servers.", Value = 90 },
            new Skill { Name = "React", Description = "React is a powerful user interface library.", Value = 90 },
            new Skill { Name = "Unity", Description = "Unity is a game engine but can also be used to create user friendly, platform independent applications.", Value = 80 },
            new Skill { Name = "Shader", Description = "", Value = 60 },
            new Skill { Name = "CI/CD", Description = "", Value = 80 },
            new Skill { Name = "C++", Description = "", Value = 40 },
            new Skill { Name = "Nginx", Description = "", Value = 40 }
            };

            await context.Skills.AddRangeAsync(skills);
            await context.SaveChangesAsync();
        }
    }
}
