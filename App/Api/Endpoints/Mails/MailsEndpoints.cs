using Infrastructure.Email;
using Application.Services;

namespace Api.Endpoints.Projects;

public static class MailEndpoints
{
    public static void MapContactEndpoints(this WebApplication app)
    {
        app.MapPost("contact/mail", PostMail);
    }

    public static async Task<IResult> PostMail(IContactService contactService, Message message, CancellationToken cancellationToken)
    {
        var result = await contactService.SendMail(message, cancellationToken);
        if (result.IsSuccess)
            return Results.Ok();
        else
            return Results.BadRequest(result);
    }
}
