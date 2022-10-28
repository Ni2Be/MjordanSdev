namespace Infrastructure.Captcha;

public class ReCaptchaConfig
{
    public string SiteKey { get; set; }
    public string SecretKey { get; set; }
    public string Version { get; set; }
    public bool UseRecaptchaNet { get; set; }
    public double ScoreThreshold { get; set; }
}