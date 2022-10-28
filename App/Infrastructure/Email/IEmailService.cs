namespace Infrastructure.Email;
public interface IEmailService
{
    Task<bool> SendPureTextEmailAsync(Message message, CancellationToken cancellationToken);
    Task<bool> SendHtmlEmailAsync(Message message, CancellationToken cancellationToken);
}
