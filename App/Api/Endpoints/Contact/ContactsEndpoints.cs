using Infrastructure.Email;
using Application.Services;
using Infrastructure.Captcha;

namespace Api.Endpoints.Contact;

public static class ContactEndpoints
{
    public static void MapContactEndpoints(this WebApplication app)
    {
        app.MapPost("contact/mail", SendMail);
    }

    public class SendMailRequest
    {
        public Message message { get; set; }
        public ReCaptchaRequest reCaptchaRequest { get; set; }
    }

    public static async Task<IResult> SendMail(
        IContactService contactService, 
        IReCaptchaService recaptchaService, 
        SendMailRequest maildto, 
        CancellationToken cancellationToken)
    {
        var captchaResult = await recaptchaService.GetGoogleResponse(maildto.reCaptchaRequest, cancellationToken);
        if (!recaptchaService.Validate(captchaResult))
            return Results.BadRequest(captchaResult.ErrorCodes);

        var result = await contactService.SendMail(maildto.message, cancellationToken);
        if (result.IsSuccess)
            return Results.Ok();
        else
            return Results.BadRequest(result);
    }
}
