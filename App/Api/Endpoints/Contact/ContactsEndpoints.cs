using Application.Services;
using Infrastructure.Captcha;
using Application.Dtos;

namespace Api.Endpoints.Contact;

public static class ContactEndpoints
{
    public static void MapContactEndpoints(this WebApplication app)
    {
        app.MapPost("contact/mail", SendMail);
    }

    public class ContactRequest
    {
        public ContactInfo contactInfo { get; set; }
        public ReCaptchaRequest reCaptchaRequest { get; set; }
    }

    public static async Task<IResult> SendMail(
        IContactService contactService, 
        IReCaptchaService recaptchaService, 
        ContactRequest contactRequest, 
        CancellationToken cancellationToken)
    {
        var captchaResult = await recaptchaService.GetGoogleResponse(contactRequest.reCaptchaRequest, cancellationToken);
        if (!recaptchaService.Validate(captchaResult))
            return Results.BadRequest(captchaResult.ErrorCodes);

        var result = await contactService.SendContactInfoMail(contactRequest.contactInfo, cancellationToken);
        if (result.IsSuccess)
            return Results.Ok();
        else
            return Results.BadRequest(result);
    }
}
