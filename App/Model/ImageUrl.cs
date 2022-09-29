using System.Xml.Linq;

namespace Model;

public class ImageUrl
{
    public ImageUrl(string name, string url)
    {
        Id = Guid.NewGuid();
        Name = name;
        Url = url;
    }
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Url { get; set; }
}