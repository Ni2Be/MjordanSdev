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
                Name = "RC Tank",
                ProjectDetails = new ProjectDetails
                {
                    Description = "A from ground up designed, 3d-printed and programmed RC Tank. It can be operated in rough terrain either remote controlled or fully autonomously when configured with ultrasonic and/or laser distance sensors.",
                    BulletPoints = "Arduino C++;Remote Controllable;Fusion 360;3d Printing",
                    ImageUrls = new List<ImageUrl>{
                        new ("preview_image", "images/projects/rctank/rc_tank_front.png"),
                        new ("details_image_0", "images/projects/rctank/rc_tank_front.png"),
                        new ("details_image_1", "images/projects/rctank/drawing.png")
                    }
                }
            },
            new Project {
                Name = "CounterpAi",
                ProjectDetails = new ProjectDetails
                {
                    Description = "An AI based learn application aimed to teach Fux Gradus ad Parnassum Species Counterpoint. Fux defined rules that should lead to a pleasing music piece when applied correctly. The tool was used to study the if an LSTM based NN can learn those rules. The analysis showed that almost all rules could be successfully predicted by the NN.",
                    BulletPoints = "Artificial Intelligence;Long Short-Term Memory Neuronal Network;Music Theory",
                    ImageUrls = new List<ImageUrl>{
                        new ("preview_image", "images/projects/counterpai/program.png"),
                        new ("details_image_0", "images/projects/counterpai/program.png"),
                        new ("details_image_1", "images/projects/counterpai/results.png")
                    }
                }
            },
            new Project {
                Name = "Event Information System",
                ProjectDetails = new ProjectDetails
                {
                    Description = "A program that allows to easily share information between event personal. Information like “Security personal needed at the entrance” can be requested by one click and then be confirmed by the central.\r\nThe system is highly customizable and can be branded and be adjusted to specific needs of an event.\r\n",
                    BulletPoints = "Node.js;Webhooks;Event business",
                    ImageUrls = new List<ImageUrl>{
                        new ("preview_image", "images/projects/vis/devices.png"),
                        new ("details_image_0", "images/projects/vis/devices.png"),
                        new ("details_image_1", "images/projects/vis/overview.svg")
                    }
                }
            }
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
