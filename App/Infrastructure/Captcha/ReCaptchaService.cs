using Microsoft.Extensions.Options;
using System.Text.Json;
using System.Threading;

namespace Infrastructure.Captcha;
public class ReCaptchaService : IReCaptchaService
{
    private readonly ReCaptchaConfig _config;

    public ReCaptchaService(IOptions<ReCaptchaConfig> config)
    {
        _config = config.Value;
    }

    public async Task<ReCaptchaResponse> GetGoogleResponse(ReCaptchaRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(request.ReCaptchaToken))
            return new ReCaptchaResponse();

        var dictionary = new Dictionary<string, string> {
                { "secret", _config.SecretKey },
                { "response", request.ReCaptchaToken }
            };
        var postContent = new FormUrlEncodedContent(dictionary);
        using var client = new HttpClient();
        var recaptchaResponse = await client.PostAsync("https://www.google.com/recaptcha/api/siteverify", postContent, cancellationToken);
        var stringContent = await recaptchaResponse.Content.ReadAsStringAsync(cancellationToken);
        return JsonSerializer.Deserialize<ReCaptchaResponse>(stringContent);
    }

    public bool Validate(ReCaptchaResponse response)
    {
        if (!response.Success)
            return false;

        if (!response.Action.Equals("submitContactForm", StringComparison.OrdinalIgnoreCase))
            return false;

        if (response.Score < _config.ScoreThreshold)
            return false;

        return true;
    }
}