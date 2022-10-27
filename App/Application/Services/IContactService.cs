using Infrastructure.Email;
using FluentResults;

namespace Application.Services;
public interface IContactService
{
    public Task<Result> SendMail(Message message, CancellationToken cancellationToken);
}
