namespace CarMaintenance.Api.DTOs
{
    public class CarDto
    {
        public Guid Id { get; init; }
        public Guid UserId { get; init; } // navigational tag
        
        public int Year { get; init; }
        
        public string? Nickname { get; init; }
        public string? Make { get; init; }
        public string? Model { get; init; }
        public string? Trim { get; init; }
        public string? Engine { get; init; }
        public string? Transmission { get; init; }
    }
}

