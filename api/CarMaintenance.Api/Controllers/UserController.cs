using CarMaintenance.Api.DTOs;
using CarMaintenance.Api.Enterprise;
using Microsoft.AspNetCore.Mvc;

namespace UserMaintenance.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UserEc _userEc;

        // Dependency injection
        public UserController(ILogger<UserController> logger, UserEc userEc)
        {
            _logger = logger;
            _userEc = userEc;
        }
        
        // Read list of users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _userEc.GetAllUsersAsync();
            return Ok(users);
        }
        
        // Read user by userId
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<UserDto>> GetUserByUserId(Guid id)
        {
            var user = await _userEc.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        
        // Delete user by userId
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteByUserId(Guid id)
        {
            var result = await _userEc.DeleteUserAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}