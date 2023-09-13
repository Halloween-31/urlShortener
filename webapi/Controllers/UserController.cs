using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using webapi.Data;
using webapi.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace webapi.Controllers
{
    [ApiController]
    [Route("/LogIn")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly AppDB_Context _context;
        private readonly IHttpContextAccessor _http_context;

        public UserController(ILogger<UserController> logger, AppDB_Context context, IHttpContextAccessor http_context)
        {
            _logger = logger;
            _context = context;
            _http_context = http_context;
        }

        [HttpGet]
        public async Task<bool> Get()
        {
            if(_http_context.HttpContext.User.FindFirstValue(ClaimTypes.Email) != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpPost]
        public async Task<bool> Post([FromBody][Bind("Email, Password")]User user)
        {
            if(user is null) 
            {
                return false;
            }

            var Users = await _context.Users.ToListAsync();
            foreach (var User in Users)
            {
                if (user == User)
                {
                    var claims = new List<Claim> { new Claim(ClaimTypes.Email, user.Email) };
                   
                    ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "MyCookiesAuthType");
                    await _http_context.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

                    return true;
                }
            }

            return false;
        }
    }
}
