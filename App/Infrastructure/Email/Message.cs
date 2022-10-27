using Microsoft.AspNetCore.Http;
using MimeKit;

namespace Application.Email;

public class Message
{
    public List<MailboxAddress> To { get; set; }
    public string Subject { get; set; }
    public string Content { get; set; }

    public IFormFileCollection Attachments { get; set; }

    public Message(IEnumerable<(string name, string mail)> to, string subject, string content, IFormFileCollection attachments)
    {
        To = new List<MailboxAddress>();

        To.AddRange(to.Select(x => new MailboxAddress(x.name, x.mail)));
        Subject = subject;
        Content = content;
        Attachments = attachments;
    }
}