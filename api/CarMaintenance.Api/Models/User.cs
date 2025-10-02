using System.ComponentModel.DataAnnotations;

namespace CarMaintenance.Api.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid(); // global user identifier
        
        [StringLength(50)] // fixed length strings; can be reduced if necessary
        public string? Name { get; init; }
        
        [Required]
        [EmailAddress]
        [StringLength(50)]
        public string? Email { get; init; }
        
        [Required]
        public string? PasswordHash { get; set; }
        
        [Required]
        public string? PasswordSalt { get; set; }
        
        public DateTime CreatedOn { get; init; } = DateTime.UtcNow;
        public DateTime ModifiedOn { get; set; }
        
        public virtual IEnumerable<Car>? Cars { get; set; } // downstream navigational property
    }
}