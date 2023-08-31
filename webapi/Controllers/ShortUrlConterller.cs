using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public ShortUrlController(ILogger<ShortUrlController> logger, AppDB_Context context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<ShortUrlInfo> Get()
        {
            return _context.ShortUrlInfos.ToArray();
        }
    }
}