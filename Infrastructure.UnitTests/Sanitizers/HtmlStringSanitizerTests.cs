using Xunit.Abstractions;
using Infrastructure.Sanitizers;
using Moq;
using Microsoft.Extensions.Options;

namespace Infrastructure.UnitTests.Sanitizers;


public class HtmlStringSanitizerTests
{
    private readonly ITestOutputHelper _testOutputHelper;
    private readonly IOptions<HtmlStringSanitizerOptoins> _htmlStringSanitizerOptoins;

    public HtmlStringSanitizerTests(ITestOutputHelper testOutputHelper)
    {
        _testOutputHelper = testOutputHelper;
        var htmlStringSanitizerOptoinsMock = Options.Create(new HtmlStringSanitizerOptoins
        {
            AllowedUrls = new List<string>
            {
                "github.com",
                "mjordans.dev",
                "api.mjordans.dev"
            },
            AllowedSchemes = new List<string>
            {
                "https"
            },
            AllowedAttributes = new List<string>
            {
                "className"
            }
        });

        _htmlStringSanitizerOptoins = htmlStringSanitizerOptoinsMock;
    }
    
    [Fact]
    public async Task Add_XSS_ExecuteScript()
    {
        // arrange
        var htmlSanitizer = new HtmlStringSanitizer(_htmlStringSanitizerOptoins);
        var html = "<script>alert(document.cookie)</script>";

        // act
        var result = htmlSanitizer.Sanitize(html);

        // assert
        Assert.Equal("", result);
    }

    [Fact]
    public async Task Add_XSS_AddButtonsToLegidPage()
    {
        // arrange
        var htmlSanitizer = new HtmlStringSanitizer(_htmlStringSanitizerOptoins);
        var html = "<a href=\"https://github.com/legidUser/\"><button>Click</button></a><a href=\"https://github.com/legidUser/\"></a>";

        // act
        var result = htmlSanitizer.Sanitize(html);

        // assert
        Assert.Equal("<a href=\"https://github.com/legidUser/\"><button>Click</button></a><a href=\"https://github.com/legidUser/\"></a>", result);
    }

    [Fact]
    public async Task Add_NoXSS_AddButtonsToSuspiciousPage()
    {
        // arrange
        var htmlSanitizer = new HtmlStringSanitizer(_htmlStringSanitizerOptoins);
        var html = "<a href=\"https://github.com.suspicious.tk/\"><button>Click</button></a><a href=\"https://github.com.suspicious.tk/\"><button>Click</button></a>";

        // act
        var result = htmlSanitizer.Sanitize(html);

        // assert
        Assert.Equal("<a href=\"[unallowed url]\"><button>Click</button></a><a href=\"[unallowed url]\"><button>Click</button></a>", result);
    }

    [Fact]
    public async Task Add_NoXSS_SomeText()
    {
        // arrange
        var htmlSanitizer = new HtmlStringSanitizer(_htmlStringSanitizerOptoins);
        var html = "<h1>Some harmless h1</h1>\n<p>\nSome harmless text\n</p>";

        // act
        var result = htmlSanitizer.Sanitize(html);

        // assert
        Assert.Equal("<h1>Some harmless h1</h1>\n<p>\nSome harmless text\n</p>", result);
    }

    [Fact]
    public async Task Add_NoXSS_SomeLinks()
    {
        // arrange
        var htmlSanitizer = new HtmlStringSanitizer(_htmlStringSanitizerOptoins);
        var html = @"   <a href=""https://github.com.Ni2Be/MjordanSdev"">here</a>
                        <a href=""https://github.com/Ni2Be/MjordanSdev"">here</a>
                        <a href=""https://google.com/"">here</a>";

        // act
        var result = htmlSanitizer.Sanitize(html);

        // assert
        Assert.DoesNotContain("https://google.com", result);
        Assert.DoesNotContain("https://github.com.Ni2Be/MjordanSdev", result);
        Assert.Contains("https://github.com/Ni2Be/MjordanSdev", result);
    }
}