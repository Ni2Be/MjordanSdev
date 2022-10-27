namespace Application.Email;
public interface IEmailService
{
    Task SendEmailAsync(Message message);
}
