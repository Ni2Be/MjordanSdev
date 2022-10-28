using Application.Dtos;
using Infrastructure.Email;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Result = FluentResults.Result;

namespace Application.Services;
public class ContactService : IContactService
{
    private readonly IEmailService _emailService;
    private readonly EmailConfiguration _emailConfig;
    private readonly ILogger<ContactService> _logger;

    public ContactService(IEmailService emailService, IOptions<EmailConfiguration> emailConfig, ILogger<ContactService> logger)
    {
        _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _emailConfig = emailConfig.Value;
    }

    public async Task<Result> SendContactInfoMail(ContactInfo contactInfo, CancellationToken cancellationToken)
    {
        try
        {
            Message message = new Message
            {
                From = new Addressee { Name = _emailConfig.FromName, Mail = _emailConfig.FromMail },
                To = new List<Addressee> { new Addressee { Name = _emailConfig.ToName, Mail = _emailConfig.ToMail } },
                Subject = "New Contact Request: " + contactInfo.Name,
                Content = $"{contactInfo.Name}\n{contactInfo.Mail}\n\n{contactInfo.Message}"
            };

            var success = await _emailService.SendPureTextEmailAsync(message, cancellationToken);
            if (success)
                return Result.Ok();
        } catch (Exception e)
        {
            return Result.Fail(e.Message);
        }
        return Result.Fail("Unknown Error.");
    }
}
