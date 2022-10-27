using Infrastructure.Email;
using Microsoft.Extensions.Logging;
using Result = FluentResults.Result;

namespace Application.Services;
public class ContactService : IContactService
{
    private readonly IEmailService _emailService;
    private readonly ILogger<ContactService> _logger;

    public ContactService(IEmailService emailService, ILogger<ContactService> logger)
    {
        _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger)); ;
    }

    public async Task<Result> SendMail(Message message, CancellationToken cancellationToken)
    {
        try
        {
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
