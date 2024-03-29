﻿using System.Data;
using Application.Services;
using Model;
using Persistence;

namespace DataInjector;
public class DataSeeder
{
    private readonly bool _isDevelopment;
    private readonly DataContext _context;
    private readonly IProjectService _projectService;
    private readonly ISkillService _skillService;


    public DataSeeder(DataContext dataContext, IProjectService projectService, ISkillService skillService, bool isDevelopment)
    {
        _context = dataContext ?? throw new ArgumentNullException(nameof(dataContext));
        _projectService = projectService ?? throw new ArgumentNullException(nameof(projectService));
        _skillService = skillService ?? throw new ArgumentNullException(nameof(skillService));
        _isDevelopment = isDevelopment;
    }

    public async Task SeedData()
    {
        if (_isDevelopment)
        {
            Console.WriteLine("Cleaning database");
            _context.Projects.RemoveRange(_context.Projects);
            _context.Skills.RemoveRange(_context.Skills);
            _context.SaveChanges();
        }

        if (!this._context.Projects.Any())
        {
            await _projectService.Add(
                new Project
                {
                    Id = "RcTank",
                    Name = "RC Tank",
                    ProjectDetails = new ProjectDetails
                    {
                        DefaultDetails = true,
                        Description = "A from ground up designed, 3d-printed and programmed RC Tank. It can be operated in rough terrain either remote controlled or fully autonomously when configured with ultrasonic and/or laser distance sensors.",
                        BulletPoints = "Arduino C++;Remote Controllable;Fusion 360;3d Printing",
                        ImageUrls = new List<ImageUrl>{
                            new ("preview_image", "images/projects/rctank/rc_tank_front.png"),
                            new ("details_image_0", "images/projects/rctank/rc_tank_front.png"),
                            new ("details_image_1", "images/projects/rctank/drawing.png")
                            }
                    }
                }, CancellationToken.None);
            await _projectService.Add(
                new Project
                {
                    Id = "CounterpAi",
                    Name = "CounterpAi",
                    ProjectDetails = new ProjectDetails
                    {
                        DefaultDetails = true,
                        Description = "An AI based learn application aimed to teach Fux Gradus ad Parnassum Species Counterpoint. Fux defined rules that should lead to a pleasing music piece when applied correctly. The tool was used to study the if an LSTM based NN can learn those rules. The analysis showed that almost all rules could be successfully predicted by the NN.",
                        BulletPoints = "Artificial Intelligence;Long Short-Term Memory Neuronal Network;Music Theory",
                        ImageUrls = new List<ImageUrl>{
                            new ("preview_image", "images/projects/counterpai/program.png"),
                            new ("details_image_0", "images/projects/counterpai/program.png"),
                            new ("details_image_1", "images/projects/counterpai/results.png")
                            }
                    }
                }, CancellationToken.None);
            await _projectService.Add(
                new Project
                {
                    Id = "EventInformationSystem",
                    Name = "Event Information System",
                    ProjectDetails = new ProjectDetails
                    {
                        DefaultDetails = true,
                        Description = "A program that allows to easily share information between event personal. Information like “Security personal needed at the entrance” can be requested by one click and then be confirmed by the central.\r\nThe system is highly customizable and can be branded and be adjusted to specific needs of an event.\r\n",
                        BulletPoints = "Node.js;Webhooks;Event business",
                        ImageUrls = new List<ImageUrl>{
                        new ("preview_image", "images/projects/vis/devices.png"),
                        new ("details_image_0", "images/projects/vis/devices.png"),
                        new ("details_image_1", "images/projects/vis/overview.svg")
                        }
                    }
                }, CancellationToken.None);
            await _projectService.Add(
                new Project
                {
                    Id = "FluidSimulation",
                    Name = "Fluid Simulation",
                    ProjectDetails = new ProjectDetails
                    {
                        DefaultDetails = true,
                        Description = "A shallow water fluid simulation based on Lattice Boltzmann methods. It was realized as a Unity Asset based on compute shaders that can be used at runtime. It also includes shaders to visualize pressure and the flow field.",
                        BulletPoints = "Compute shaders;Unity;Fluid simulation",
                        ImageUrls = new List<ImageUrl>{
                        new ("preview_image", "images/projects/lbm/lbm.webp"),
                        new ("details_image_0", "images/projects/lbm/lbm.webp"),
                        new ("details_image_1", "images/projects/lbm/tau.png")
                        }
                    }
                }, CancellationToken.None);
            await _projectService.Add(
                new Project
                {
                    Id = "MjordanS",
                    Name = "MjordanS",
                    ProjectDetails = new ProjectDetails
                    {
                        DefaultDetails = false,
                        Description = @"
<div rows=""2"" className=""ui two column grid"">
    <div className=""row"">
        <div className=""column"">
            <h1>Description</h1>
            <p>This site was realized in .Net and React and an automatic deployment with GitHub actions and docker. The full source code is accessible <a href=""https://github.com/Ni2Be/MjordanSdev"">here</a>.</p></div><div className=""column"">
            <img src=""{{details_image_0}}"" className=""ui image fluid detailImage"" style=""background-color:transparent"" />
        </div>
    </div>
    <div className=""row"">
        <div className=""column"">
            <img src=""{{details_image_1}}"" className=""ui image fluid detailImage"" style=""background-color:transparent"" width=""200px"">
        </div>
        <div className=""column"">
            <h1>Bullet Points</h1>
            <ul>
                <li>.Net</li>
                <li>React</li>
                <li>CI/CD</li>
                <li>Docker</li>
                <li>GraphQL</li>
            </ul>
        </div>
    </div>
</div>
                        ",
                        BulletPoints = ".Net;React;CI/CD;Docker;GraphQL",
                        ImageUrls = new List<ImageUrl>{
                        new ("preview_image", "images/projects/mjordans/logo.svg"),
                        new ("details_image_0", "images/projects/mjordans/overview.svg"),
                        new ("details_image_1", "images/projects/mjordans/technologies.svg")
                        }
                    }
                }, CancellationToken.None);
            await _projectService.Add(
                new Project
                {
                    Id = "NoiseLib",
                    Name = "Noise Lib",
                    ProjectDetails = new ProjectDetails
                    {
                        DefaultDetails = true,
                        Description = "A Unity Library that allows to generate and work with noises. It includes the most common noises: Simplex, Cellular and Voronoi, all can be generated in 2d or 3d and in a fractal Brownian motion variant. Most noises can also be generated in an octave shifting and non-shifting version, the shifting versions are intended for animations (e.g., water textures) and the non-shifting versions can be used for tiled world generation.\r\nAll noises are generated as Render Textures and the library includes functions to combine noises in different ways. \r\n",
                        BulletPoints = "Unity;Compute shaders;Noise",
                        ImageUrls = new List<ImageUrl>{
                            new ("preview_image", "images/projects/noiselib/combiner.png"),
                            new ("details_image_0", "images/projects/noiselib/combiner.png"),
                            new ("details_image_1", "images/projects/noiselib/noise.webp")
                            }
                    }
                }, CancellationToken.None);
        }

        if (!_context.Skills.Any())
        {
            // Low level
            var csharp = new Skill { Name = "C#", Description = "", Value = 90, Type = "Low Level" };
            var cPP = new Skill { Name = "C++", Description = "", Value = 82, Type = "Low Level" };
            var yaml = new Skill { Name = "yaml", Description = "", Value = 95, Type = "Low Level" };
            var ts = new Skill { Name = "TS", Description = "", Value = 86, Type = "Low Level" };
            var hlsl = new Skill { Name = "HLSL", Description = "", Value = 88, Type = "Low Level" };
            var glsl = new Skill { Name = "GLSL", Description = "", Value = 83, Type = "Low Level" };
            var css = new Skill { Name = "CSS", Description = "", Value = 89, Type = "Low Level" };
            var html = new Skill { Name = "HTML", Description = "", Value = 89, Type = "Low Level" };
            var graphQL = new Skill { Name = "GraphQL", Description = "", Value = 90, Type = "Low Level" };
            var hotChocolate = new Skill { Name = "HotChocolate", Description = "", Value = 90, Type = "Low Level" };
            var docker = new Skill { Name = "Docker", Description = "", Value = 89, Type = "Low Level" };
            var wix = new Skill { Name = "WiX", Description = "WiX is a set of tools to create Windows installers.", Value = 79, Type = "Low Level" };
            await _skillService.Add(csharp, CancellationToken.None);
            await _skillService.Add(cPP, CancellationToken.None);
            await _skillService.Add(yaml, CancellationToken.None);
            await _skillService.Add(ts, CancellationToken.None);
            await _skillService.Add(hlsl, CancellationToken.None);
            await _skillService.Add(glsl, CancellationToken.None);
            await _skillService.Add(css, CancellationToken.None);
            await _skillService.Add(html, CancellationToken.None);
            await _skillService.Add(graphQL, CancellationToken.None);
            await _skillService.Add(hotChocolate, CancellationToken.None);
            await _skillService.Add(wix, CancellationToken.None);
            await _skillService.Add(docker, CancellationToken.None);

            // Mid level
            var dotnet = new Skill
            {
                Name = ".Net",
                Description = ".Net is a solid backend that can run on Windows and Linux servers.",
                Value = 90,
                Type = "Mid Level",
                ChildSkills = new List<Skill>{
                       csharp, graphQL, hotChocolate
                    }
            };
            var wpf = new Skill
            {
                Name = "WPF",
                Description = "WPF is a UI framework from Microsoft.",
                Value = 85,
                Type = "Mid Level",
                ChildSkills = new List<Skill>{
                       csharp
                    }
            };
            var react = new Skill
            {
                Name = "React",
                Description = "React is a powerful user interface library.",
                Value = 90,
                Type = "Mid Level",
                ChildSkills = new List<Skill>{
                        ts, css, html
                    }
            };
            var shader = new Skill
            {
                Name = "Shader",
                Description = "",
                Value = 80,
                Type = "Mid Level",
                ChildSkills = new List<Skill>{
                        hlsl, glsl
                    }
            };
            var nginx = new Skill
            {
                Name = "Nginx",
                Description = "",
                Value = 69,
                Type = "Mid Level",
                ChildSkills = new List<Skill>{
                        yaml
                    }
            };
            var cicd = new Skill
            {
                Name = "CI/CD",
                Description = "",
                Value = 80,
                Type = "Mid Level",
                ChildSkills = new List<Skill>{
                        yaml, docker
                    }
            };
            await _skillService.Add(dotnet, CancellationToken.None);
            await _skillService.Add(wpf, CancellationToken.None);
            await _skillService.Add(react, CancellationToken.None);
            await _skillService.Add(shader, CancellationToken.None);
            await _skillService.Add(nginx, CancellationToken.None);
            await _skillService.Add(cicd, CancellationToken.None);

            // High level
            var backend = new Skill {
                Name = "Backend",
                Description = "Backend includes everything that runs on a server, in the cloud or just as a backend for frontend on the same machine.",
                Value = 100,
                Type = "High Level",
                ChildSkills = new List<Skill>{
                       dotnet, wix, docker, cicd
                    } };
            var frontend = new Skill {
                Name = "Frontend",
                Description = "Frontend includes everything that gives an interface to the user.",
                Value = 100,
                Type = "High Level",
                ChildSkills = new List<Skill>{
                       wpf, react, shader, cicd
                    } };
            var unity = new Skill {
                Name = "Unity",
                Description = "Unity is a game engine but can also be used to create user friendly, platform independent applications.",
                Value = 100,
                Type = "High Level",
                ChildSkills = new List<Skill>{
                        csharp, hlsl
                    } };
            var hosting = new Skill
            {
                Name = "Hosting",
                Description = "",
                Value = 100,
                Type = "High Level",
                ChildSkills = new List<Skill>{
                        nginx, docker, cicd
                    }
            };
            await _skillService.Add(backend, CancellationToken.None);
            await _skillService.Add(frontend, CancellationToken.None);
            await _skillService.Add(unity, CancellationToken.None);
            await _skillService.Add(hosting, CancellationToken.None);
        }
    }
}
