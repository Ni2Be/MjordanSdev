namespace Model;

public class Project
{
    public string Id { get; set; }
    public string Name { get; set; }
    public virtual ProjectDetails ProjectDetails { get; set; }
}
