using CarMaintenance.Api.Data;
using CarMaintenance.Api.DTOs;
using CarMaintenance.Api.Models;
using CarMaintenance.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarMaintenance.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController: ControllerBase
    {
        private readonly EntityDbContext _context;
        private readonly IAuthService _authService;

        public AuthenticationController(EntityDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(UserRegistrationDto userRegistration)
        {
            if (await _context.Users.AnyAsync(u => u.Email == userRegistration.Email))
            {
                return BadRequest("Email already exists");
            }

            _authService.CreatePasswordHash(userRegistration.Password,
                out string passwordHash, out string passwordSalt);

            var user = new User
            {
                Name = userRegistration.Name,
                Email = userRegistration.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                ModifiedOn = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                CreatedOn = user.CreatedOn
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserLoginDto userLogin)
        {
            var user = await _context.Users.FirstOrDefaultAsync(
                u => u.Email == userLogin.Email);

            if (user == null)
            {
                return Unauthorized("Invalid email or password");
            }

            if (!_authService.VerifyPasswordHash(userLogin.Password,
                    user.PasswordHash, user.PasswordSalt))
            {
                return Unauthorized("Invalid email or password");
            }

            string token = _authService.GenerateJwtToken(user);
            return Ok(token);
        }
    }
}
