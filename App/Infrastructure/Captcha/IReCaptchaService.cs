namespace Infrastructure.Captcha;
public interface IReCaptchaService
{
    public Task<ReCaptchaResponse> GetGoogleResponse(ReCaptchaRequest request, CancellationToken cancellationToken);
    public bool Validate(ReCaptchaResponse response);
}