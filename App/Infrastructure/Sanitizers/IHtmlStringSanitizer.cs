using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Sanitizers;
public interface IHtmlStringSanitizer
{
    public string Sanitize(string html);
}
