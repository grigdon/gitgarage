using CarMaintenance.Api.DTOs;
using Microsoft.AspNetCore.Mvc;
using CarMaintenance.Api.Enterprise;

namespace CarMaintenance.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarController : ControllerBase
    {
        private readonly ILogger<CarController> _logger;
        private readonly CarEc _carEC;

        // Dependency injection
        public CarController(ILogger<CarController> logger, CarEc carEc)
        {
            _logger = logger;
            _carEC = carEc;
        }
        
        // Create car
        [HttpPost]
        public async Task<ActionResult<CarDto>> CreateCar([FromBody] CarDto car)
        {
            var createdCar = await _carEC.CreateCarAsync(car);
            return CreatedAtAction(nameof(GetCarByCarId), new { id = createdCar.Id }, createdCar);
        }
        
        // Read list of cars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarDto>>> GetCars()
        {
            var cars = await _carEC.GetAllCarsAsync();
            return Ok(cars);
        }
        
        // Read car by carId
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<CarDto>> GetCarByCarId(Guid id)
        {
            var car = await _carEC.GetCarByIdAsync(id);
            if (car == null)
            {
                return NotFound();
            }
            return Ok(car);
        }
        
        // Read car by userId (using a distinct route)
        [HttpGet("user/{userId:guid}")]
        public async Task<ActionResult<CarDto>> GetCarByUserId(Guid userId)
        {
            var cars = await _carEC.GetCarsByUserIdAsync(userId);
            if (cars == null || !cars.Any())
            {
                return NotFound();
            }
            return Ok(cars);
        }
        
        // Update car 
        [HttpPut("{id:guid}")]
        public async Task<ActionResult<CarDto>> UpdateCarById(Guid id, [FromBody] CarDto car)
        {
            if (car == null)
            {
                return BadRequest();
            }
            var updatedCar = await _carEC.UpdateCarAsync(id, car);
            if (updatedCar == null)
            {
                return NotFound();
            }
            return Ok(updatedCar);
        }
        
        // Delete car by carId
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteByCarId(Guid id)
        {
            var result = await _carEC.DeleteCarAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}