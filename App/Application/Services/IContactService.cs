using Infrastructure.Email;
using FluentResults;
using Infrastructure.Captcha;

namespace Application.Services;
public interface IContactService
{
    public Task<Result> SendMail(Message message, CancellationToken cancellationToken);
}
