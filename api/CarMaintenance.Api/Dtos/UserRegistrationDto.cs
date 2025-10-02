using System.ComponentModel.DataAnnotations;

namespace CarMaintenance.Api.DTOs
{
    public class UserRegistrationDto
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        
        [Required]
        [EmailAddress]
        [StringLength(50)]
        public string Email { get; set; }
        
        [Required]
        [StringLength(50, MinimumLength = 8)]
        public string Password { get; set; }
    } 
}