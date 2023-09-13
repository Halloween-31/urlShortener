using Azure.Core.Pipeline;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using webapi.Data;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShortUrlController : ControllerBase
    {
        private readonly ILogger<ShortUrlController> _logger;
        private readonly AppDB_Context _context;
        private readonly IHttpContextAccessor _http_context;

        public ShortUrlController(ILogger<ShortUrlController> logger, AppDB_Context context, IHttpContextAccessor http_context)
        {
            _logger = logger;
            _context = context;
            _http_context = http_context;
        }

        [HttpGet]
        public IEnumerable<ShortUrlInfo> Get()
        {
            return _context.ShortUrlInfos.ToArray();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ShortUrlInfo?> Get([FromRoute]int id)
        {
            return await _context.ShortUrlInfos.FirstOrDefaultAsync(sh => sh.Id == id);
        }
                
        [HttpPut]
        [Authorize]
        public async Task<ShortUrlInfo?> Put([FromBody][Bind("Url, ShortUrl")]ShortUrlInfo Url)
        {
            var AllUrls = await _context.ShortUrlInfos.Select(s => s.Url).ToListAsync();
            foreach (var url in AllUrls)
            {
                if(url == Url.Url)
                {
                    return null;
                }
            }

            Url.ShortUrl = "sdas";
            Url.CreatedBy = _http_context.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            Url.CreatedTime = DateTime.UtcNow;

            await _context.ShortUrlInfos.AddAsync(Url);
            await _context.SaveChangesAsync();

            return Url;
        }

        [HttpPost]
        [Authorize]        
        public async Task<bool> Delete([FromBody]int id)
        {
			var Url = await _context.ShortUrlInfos.FindAsync(id);
            if(Url is null)
            {
                return false;
            }
            var UserEmail = _http_context.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var User = await _context.Users.FirstOrDefaultAsync(u => u.Email == UserEmail);
            if(User.Role != Role.Admin)
            {
                if (Url.CreatedBy != UserEmail)
                {
                    return false;
                }
            }

            _context.ShortUrlInfos.Remove(Url); 
            await _context.SaveChangesAsync();

            return true;
		}
	}
}