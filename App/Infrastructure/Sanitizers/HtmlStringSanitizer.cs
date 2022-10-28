using Ganss.Xss;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Text.RegularExpressions;

namespace Infrastructure.Sanitizers;

public class HtmlStringSanitizerOptoins
{
    public ICollection<string> AllowedUrls { get; set; }
    public ICollection<string> AllowedSchemes { get; set; }
    public ICollection<string> AllowedAttributes { get; set; }
}

public static class ServiceExtensions
{
    public static void AddHtmlStringSanitizer(this IServiceCollection services,
        Action<HtmlStringSanitizerOptoins>? options = null)
    {
        services.Configure(options);
        services.AddScoped<IHtmlStringSanitizer, HtmlStringSanitizer>();
    }
}

public class HtmlStringSanitizer : IHtmlStringSanitizer
{
    private readonly HashSet<string> _allowedUrls;
    private readonly HtmlSanitizer _htmlSanitizer;

    public HtmlStringSanitizer(IOptions<HtmlStringSanitizerOptoins> options)
    {
        _allowedUrls = options.Value.AllowedUrls?.ToHashSet();

        _htmlSanitizer = new HtmlSanitizer();

        if (options.Value.AllowedSchemes != null)
        {
            _htmlSanitizer.AllowedSchemes.Clear();

            foreach (var allowedScheme in options.Value.AllowedSchemes)
                _htmlSanitizer.AllowedSchemes.Add(allowedScheme);
        }

        if (options.Value.AllowedAttributes != null)
        {
            foreach (var allowedAttribute in options.Value.AllowedAttributes)
                _htmlSanitizer.AllowedAttributes.Add(allowedAttribute);
        }
    }

    public string Sanitize(string html)
    {
        html = ClearUrls(html);
        return _htmlSanitizer.Sanitize(html);
    }

    private string ClearUrls(string html)
    {
        if (_allowedUrls == null || _allowedUrls.Count == 0)
            return html;
        var pattern = "https:\\/\\/(.*?)\\/";
        return Regex.Replace(html, pattern, (url) =>
        {
            var uri = url.Groups[1].Value;
            return _allowedUrls.Contains(uri) ? $"https://{uri}/" : "[unallowed url]";
        });
    }
}
