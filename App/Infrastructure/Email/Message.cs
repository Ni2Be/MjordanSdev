using Microsoft.AspNetCore.Http;

namespace Infrastructure.Email;

public class Message
{
    public Addressee From { get; set; }
    public ICollection<Addressee> To { get; set; }
    public string Subject { get; set; }
    public string Content { get; set; }

    public IFormFileCollection? Attachments { get; set; }
}