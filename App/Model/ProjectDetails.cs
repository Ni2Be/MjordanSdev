using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model;
public class ProjectDetails
{
    public Guid Id { get; set; }
    public Project Project { get; set; }
    public Guid ProjectId { get; set; }
    public string Description { get; set; }
    public string BulletPoints { get; set; }
    public virtual ICollection<ImageUrl> ImageUrls { get; set; }
}
