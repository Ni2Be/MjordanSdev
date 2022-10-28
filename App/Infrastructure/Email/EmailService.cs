using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using ContentType = MimeKit.ContentType;

namespace Infrastructure.Email;

public class EmailService : IEmailService
{
    private readonly EmailConfiguration _emailConfig;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IOptions<EmailConfiguration> emailConfig, ILogger<EmailService> logger)
    {
        _emailConfig = emailConfig?.Value ?? throw new ArgumentNullException(nameof(emailConfig));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<bool> SendPureTextEmailAsync(Message message, CancellationToken cancellationToken)
    {
        var mailMessage = CreateEmailMessage(message, false);

        return await SendAsync(mailMessage, cancellationToken);
    }

    public async Task<bool> SendHtmlEmailAsync(Message message, CancellationToken cancellationToken)
    {
        var mailMessage = CreateEmailMessage(message, true);

        return await SendAsync(mailMessage, cancellationToken);
    }

    private MimeMessage CreateEmailMessage(Message message, bool htmlBody)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress(message.From.Name, message.From.Mail));

        emailMessage.To.AddRange(message.To.Select(x => new MailboxAddress(x.Name, x.Mail)));
        emailMessage.Subject = message.Subject;

        if (htmlBody)
            emailMessage.Body = CreateHtmlBody(message);
        else
            emailMessage.Body = CreatePureTextBody(message);
        
        return emailMessage;
    }

    private MimeEntity CreatePureTextBody(Message message)
    {
        var bodyBuilder = new BodyBuilder { TextBody = message.Content };
        return bodyBuilder.ToMessageBody();
    }

    private MimeEntity CreateHtmlBody(Message message)
    {
        var bodyBuilder = new BodyBuilder { HtmlBody = message.Content };

        if (message.Attachments != null && message.Attachments.Any())
        {
            byte[] fileBytes;
            foreach (var attachment in message.Attachments)
            {
                using (var ms = new MemoryStream())
                {
                    attachment.CopyTo(ms);
                    fileBytes = ms.ToArray();
                }

                bodyBuilder.Attachments.Add(attachment.FileName, fileBytes, ContentType.Parse(attachment.ContentType));
            }
        }
        return bodyBuilder.ToMessageBody();
    }

    private async Task<bool> SendAsync(MimeMessage mailMessage, CancellationToken cancellationToken)
    {
        try
        {
            using var client = new SmtpClient();
            client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_emailConfig.UserName, _emailConfig.Password, cancellationToken);
            await client.SendAsync(mailMessage, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError("Could not send mail.", ex);
            throw;
        }
        return true;
    }
}