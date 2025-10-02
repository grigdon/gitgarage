using CarMaintenance.Api.DTOs;
using CarMaintenance.Api.Data;
using CarMaintenance.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CarMaintenance.Api.Enterprise
{
    public class UserEc
    {
        private readonly EntityDbContext _context;

        public UserEc(EntityDbContext context)
        {
            _context = context; // dependency injection from UserDbContext
        }

        private static UserDto MapUserToUserDto(User user) 
        {
            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                CreatedOn = user.CreatedOn
            };
        }

        private static User MapUserDtoToUserEntity(UserDto dto)
        {
            return new User
            {
                Id = dto.Id != Guid.Empty ? dto.Id : Guid.NewGuid(), // ID will be generated if null
                Name = dto.Name,
                Email = dto.Email,
                CreatedOn = dto.CreatedOn,
                ModifiedOn = DateTime.UtcNow
            };
        }
        
        // Read all users
        public async Task<List<UserDto>> GetAllUsersAsync()
        {
            var users = await _context.Users.ToListAsync();
            return users.Select(MapUserToUserDto).ToList();
        }
        
        // Read user by user.id
        public async Task<UserDto?> GetUserByIdAsync(Guid userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            return user != null ? MapUserToUserDto(user) : null;
        }
        
        // Read user by email
        public async Task<UserDto?> GetUserByEmailAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user != null ? MapUserToUserDto(user) : null;
        }
        
        // Delete a user
        public async Task<bool> DeleteUserAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            
            if (user == null)
                return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}