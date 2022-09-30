namespace Model;

public class Project
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public virtual ProjectDetails ProjectDetails { get; set; }
}
