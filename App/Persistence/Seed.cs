using Model;

namespace Persistence;
public static class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if (!context.Projects.Any())
        {
            var projects = new List<Project> {
            new Project { Name = "Dummy Project 1", Description = "Elitr ea elitr duis erat est soluta et eos ut duis ipsum. Sed qui erat ut diam dolores dolore diam rebum sed lorem ut duo augue ut consequat. Eu elit amet diam et erat sit odio aliquyam duis nonumy autem sit takimata lorem adipiscing et. Dolor lorem sit. Facer diam eos erat no eum et. Ut at in et sanctus sit clita sed eros sed. Dolore tation esse sadipscing possim dolor. Amet amet erat qui et congue takimata odio consetetur diam duo lorem et dolor. Vel eos rebum nonumy magna dolor lorem sit sed. Gubergren et dolor ut est et nobis sed dolore autem sed voluptua takimata. Nonumy sea ut sanctus sit iriure vero est aliquyam blandit molestie minim aliquyam amet vulputate. Elitr et dolor labore nulla vel eirmod suscipit diam sea invidunt et nonummy justo invidunt commodo. At diam et duo ipsum. Eirmod erat sanctus ut justo consequat dolore ipsum at sanctus tation et consetetur nisl et possim at in. Dolores nonumy diam aliquyam no eros vel ut iriure invidunt. Dolor amet dolor dolores zzril. Accumsan ipsum invidunt sea duis lorem consetetur et eos aliquip sed consetetur consetetur vero rebum labore assum aliquyam. Magna ipsum sit. Est diam ea sit velit est takimata sed sed." },
            new Project { Name = "Dummy Project 2", Description = "Elitr ea elitr duis erat est soluta et eos ut duis ipsum. Sed qui erat ut diam dolores dolore diam rebum sed lorem ut duo augue ut consequat. Eu elit amet diam et erat sit odio aliquyam duis nonumy autem sit takimata lorem adipiscing et. Dolor lorem sit. Facer diam eos erat no eum et. Ut at in et sanctus sit clita sed eros sed. Dolore tation esse sadipscing possim dolor. Amet amet erat qui et congue takimata odio consetetur diam duo lorem et dolor. Vel eos rebum nonumy magna dolor lorem sit sed. Gubergren et dolor ut est et nobis sed dolore autem sed voluptua takimata. Nonumy sea ut sanctus sit iriure vero est aliquyam blandit molestie minim aliquyam amet vulputate. Elitr et dolor labore nulla vel eirmod suscipit diam sea invidunt et nonummy justo invidunt commodo. At diam et duo ipsum. Eirmod erat sanctus ut justo consequat dolore ipsum at sanctus tation et consetetur nisl et possim at in. Dolores nonumy diam aliquyam no eros vel ut iriure invidunt. Dolor amet dolor dolores zzril. Accumsan ipsum invidunt sea duis lorem consetetur et eos aliquip sed consetetur consetetur vero rebum labore assum aliquyam. Magna ipsum sit. Est diam ea sit velit est takimata sed sed." }
            };

            await context.Projects.AddRangeAsync(projects);
            await context.SaveChangesAsync();
        }
    }
}
