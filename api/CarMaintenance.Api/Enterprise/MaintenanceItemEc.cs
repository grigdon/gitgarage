using CarMaintenance.Api.DTOs;
using CarMaintenance.Api.Data;
using CarMaintenance.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CarMaintenance.Api.Enterprise
{
    public class MaintenanceItemEc
    {
        private readonly EntityDbContext _context;

        public MaintenanceItemEc(EntityDbContext context)
        {
            _context = context; // dependency injection from MaintenanceItemDbContext
        }

        private static MaintenanceItemDto MapMaintenanceItemToMaintenanceItemDto(MaintenanceItem item) 
        {
            return new MaintenanceItemDto
            {
                Id = item.Id,
                Description = item.Description,
                Cost = item.Cost,
                Date = item.Date,
                CreatedOn = item.CreatedOn,
                ModifiedOn = item.ModifiedOn
            };
        }

        private static MaintenanceItem MapMaintenanceItemDtoToMaintenanceItemEntity(MaintenanceItemDto dto)
        {
            return new MaintenanceItem
            {
                Id = dto.Id != Guid.Empty ? dto.Id : Guid.NewGuid(), // ID will be generated if null
                Description = dto.Description,
                Cost = dto.Cost,
                Date = dto.Date,
                CreatedOn = dto.CreatedOn,
                ModifiedOn = DateTime.UtcNow
                // Note: CarId is not in the DTO but would need to be provided
            };
        }
        
        // Create MaintenanceItem
        public async Task<MaintenanceItemDto> CreateMaintenanceItemAsync(MaintenanceItemDto itemDto, Guid carId)
        {
            var item = MapMaintenanceItemDtoToMaintenanceItemEntity(itemDto); 
            item.CarId = carId;
            
            _context.MaintenanceItems.Add(item);
            await _context.SaveChangesAsync();
            
            return MapMaintenanceItemToMaintenanceItemDto(item); 
        }
        
        // Read all maintenance items
        public async Task<List<MaintenanceItemDto>> GetAllMaintenanceItemsAsync()
        {
            var items = await _context.MaintenanceItems.ToListAsync();
            return items.Select(MapMaintenanceItemToMaintenanceItemDto).ToList();
        }
        
        // Read maintenance item by id
        public async Task<MaintenanceItemDto?> GetMaintenanceItemByIdAsync(Guid itemId)
        {
            var item = await _context.MaintenanceItems.FirstOrDefaultAsync(i => i.Id == itemId);
            return item != null ? MapMaintenanceItemToMaintenanceItemDto(item) : null;
        }
        
        // Read maintenance items by car id
        public async Task<List<MaintenanceItemDto>> GetMaintenanceItemsByCarIdAsync(Guid carId)
        {
            var items = await _context.MaintenanceItems.Where(i => i.CarId == carId).ToListAsync();
            return items.Select(MapMaintenanceItemToMaintenanceItemDto).ToList();
        }
        
        // Update maintenance item
        public async Task<MaintenanceItemDto?> UpdateMaintenanceItemAsync(Guid id, MaintenanceItemDto updatedItemDto)
        {
            var existingItem = await _context.MaintenanceItems.FindAsync(id);

            if (existingItem == null)
            {
                return null;
            }
            
            // Update properties
            existingItem.Description = updatedItemDto.Description;
            existingItem.Cost = updatedItemDto.Cost;
            existingItem.Date = updatedItemDto.Date;
            existingItem.ModifiedOn = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return MapMaintenanceItemToMaintenanceItemDto(existingItem);
        }
        
        // Delete a maintenance item
        public async Task<bool> DeleteMaintenanceItemAsync(Guid id)
        {
            var item = await _context.MaintenanceItems.FindAsync(id);
            
            if (item == null)
                return false;

            _context.MaintenanceItems.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}