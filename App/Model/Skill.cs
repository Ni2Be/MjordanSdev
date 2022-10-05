using Microsoft.EntityFrameworkCore;

namespace Model;

[Index(nameof(Name), IsUnique = true)]
public class Skill
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Value { get; set; }
    public virtual ICollection<Skill> ChildSkills { get; set; }
    public virtual ICollection<Skill> ParentSkills { get; set; }
}
