using System.ComponentModel.DataAnnotations;

namespace CarMaintenance.Api.Models
{
    public class MaintenanceItem
    {
        public Guid Id { get; set; } = Guid.NewGuid(); // global identifier
        public Guid CarId { get; set; } // upstream identifier tag
        
        [StringLength(200)] // This is a filler value for now
        public string? Description { get; set; }

        public DateTime Date { get; set; }
        public decimal Cost { get; set; }
        
        public DateTime CreatedOn { get; init; } = DateTime.UtcNow;
        public DateTime ModifiedOn { get; set; }
        
        public virtual Car? Car { get; set; } // upstream navigational identifier
    }
}

