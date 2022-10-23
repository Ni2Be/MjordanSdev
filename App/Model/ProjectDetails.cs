namespace Model;
public class ProjectDetails : IImageOwner
{
    public Guid Id { get; set; }
    public Project Project { get; set; }
    public Guid ProjectId { get; set; }
    public bool DefaultDetails { get; set; }
    public string Description { get; set; }
    public string BulletPoints { get; set; }
    public virtual ICollection<ImageUrl> ImageUrls { get; set; }
}
