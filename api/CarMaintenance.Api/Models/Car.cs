using System.ComponentModel.DataAnnotations;

namespace CarMaintenance.Api.Models
{
    public class Car
    {
        public Guid Id { get; init; } = Guid.NewGuid(); // global car identifier
        
        public Guid UserId { get; init; } // navigational tag 
        
        public int Year { get; set; }
        
        [StringLength(50)]
        public string? Nickname { get; set; } // fixed length strings 
        
        [StringLength(50)]
        public string? Make { get; set; }
        
        [StringLength(50)]
        public string? Model { get; set; }
        
        [StringLength(50)]
        public string? Trim { get; set; }
        
        [StringLength(50)]
        public string? Engine { get; set; }
        
        [StringLength(50)]
        public string? Transmission { get; set; }

        public DateTime CreatedOn { get; init; } = DateTime.UtcNow;
        public DateTime ModifiedOn { get; set; }
        
        public virtual IEnumerable<MaintenanceItem>? MaintenanceItems { get; set; } // downstream navigational property
        public virtual User? User { get; set; } // upstream navigational property
    }
}