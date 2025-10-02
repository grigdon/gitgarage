namespace CarMaintenance.Api.DTOs
{
    public class UserDto
    {
        public Guid Id { get; set; }
        
        public string? Name { get; init; }
        public string? Email { get; init; }
        
        public DateTime CreatedOn { get; init; }
    }
}