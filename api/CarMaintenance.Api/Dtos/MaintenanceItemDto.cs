namespace CarMaintenance.Api.DTOs
{
    public class MaintenanceItemDto
    {
        public Guid Id { get; set; }
        
        public decimal Cost { get; set; }
        
        public string? Description { get; set; }
        
        public DateTime Date { get; set; }
        public DateTime CreatedOn { get; init; }
        public DateTime ModifiedOn { get; set; }
    }
}