using FluentResults;
using Application.Dtos;

namespace Application.Services;
public interface IContactService
{
    public Task<Result> SendContactInfoMail(ContactInfo contactInfo, CancellationToken cancellationToken);
}
