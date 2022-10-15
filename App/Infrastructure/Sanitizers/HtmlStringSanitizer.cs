using Ganss.Xss;
using System.Text.RegularExpressions;

namespace Infrastructure.Sanitizers;
public class HtmlStringSanitizer : IHtmlStringSanitizer
{
    private readonly HashSet<string> _allowedUrls;
    private readonly HtmlSanitizer _htmlSanitizer;
    public HtmlStringSanitizer()
    {
        _allowedUrls = new HashSet<string> {
            "github.com",
            "mjordans.dev",
            "api.mjordans.dev"
        };

        _htmlSanitizer = new HtmlSanitizer();

        _htmlSanitizer.AllowedSchemes.Clear();
        _htmlSanitizer.AllowedSchemes.Add("https");

        _htmlSanitizer.AllowedAttributes.Add("className");
    }

    public string Sanitize(string html)
    {
        html = ClearUrls(html);
        return _htmlSanitizer.Sanitize(html);
    }

    private string ClearUrls(string html)
    {
        var pattern = "https:\\/\\/(.*?)\\/";
        return Regex.Replace(html, pattern, (url) =>
        {
            var uri = url.Groups[1].Value;
            return _allowedUrls.Contains(uri) ? $"https://{uri}/" : "[unallowed url]";
        });
    }
}
