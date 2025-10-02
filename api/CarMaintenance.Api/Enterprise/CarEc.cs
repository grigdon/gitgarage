using CarMaintenance.Api.DTOs;
using CarMaintenance.Api.Data;
using CarMaintenance.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CarMaintenance.Api.Enterprise
{
    public class CarEc
    {
        private readonly EntityDbContext _context;

        public CarEc(EntityDbContext context)
        {
            _context = context; // dependency injection from CarDbContext
        }

        private static CarDto MapCarToCarDto(Car car) 
        {
            return new CarDto
            {
                Id = car.Id,
                UserId = car.UserId,
                Year = car.Year,
                Nickname = car.Nickname,
                Make = car.Make,
                Model = car.Model,
                Trim = car.Trim,
                Engine = car.Engine,
                Transmission = car.Transmission
            };
        }

        private static Car MapCarDtoToCarEntity(CarDto dto)
        {
            return new Car
            {
                Id = dto.Id != Guid.Empty ? dto.Id : Guid.NewGuid(), // ID will be generated if null
                UserId = dto.UserId,
                Year = dto.Year,
                Nickname = dto.Nickname,
                Make = dto.Make,
                Model = dto.Model,
                Trim = dto.Trim,
                Engine = dto.Engine,
                Transmission = dto.Transmission,
                ModifiedOn = DateTime.UtcNow
            };
        }
        
        // Create Car
        public async Task<CarDto> CreateCarAsync(CarDto carDto)
        {
            var car = MapCarDtoToCarEntity(carDto); 
            
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();
            
            return MapCarToCarDto(car); 
        }
        
        // Read all cars
        public async Task<List<CarDto>> GetAllCarsAsync()
        {
            var cars = await _context.Cars.ToListAsync();
            return cars.Select(MapCarToCarDto).ToList();
        }
        
        // Read car by car.id
        public async Task<CarDto?> GetCarByIdAsync(Guid carId)
        {
            var car = await _context.Cars.FirstOrDefaultAsync(c => c.Id == carId);
            return car != null ? MapCarToCarDto(car) : null;
        }
        
        // Read cars by user.id
        public async Task<List<CarDto>> GetCarsByUserIdAsync(Guid userId)
        {
            var cars = await _context.Cars.Where(c => c.UserId == userId).ToListAsync();
            return cars.Select(MapCarToCarDto).ToList();
        }
        
        // Update car
        public async Task<CarDto?> UpdateCarAsync(Guid id, CarDto updatedCarDto)
        {
            var existingCar = await _context.Cars.FindAsync(id);

            if (existingCar == null)
            {
                return null;
            }
            
            // Update properties
            existingCar.Nickname = updatedCarDto.Nickname;
            existingCar.Year = updatedCarDto.Year;
            existingCar.Make = updatedCarDto.Make;
            existingCar.Model = updatedCarDto.Model;
            existingCar.Trim = updatedCarDto.Trim;
            existingCar.Engine = updatedCarDto.Engine;
            existingCar.ModifiedOn = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return MapCarToCarDto(existingCar);
        }
        
        // Delete a car
        public async Task<bool> DeleteCarAsync(Guid id)
        {
            var car = await _context.Cars.FindAsync(id);
            
            if (car == null)
                return false;

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}