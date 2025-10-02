using CarMaintenance.Api.DTOs;
using Microsoft.AspNetCore.Mvc;
using CarMaintenance.Api.Enterprise;

namespace CarMaintenance.Api.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class MaintenanceItemController: ControllerBase
{
    private readonly ILogger<MaintenanceItemController> _logger;
    private readonly MaintenanceItemEc _maintenanceItemEc;

    public MaintenanceItemController(ILogger<MaintenanceItemController> logger, MaintenanceItemEc maintenanceItemEc)
    {
        _logger = logger; // dependency injection
        _maintenanceItemEc = maintenanceItemEc;
    }
    
    // Create MaintenanceItem
    [HttpPost]
    public async Task<ActionResult<MaintenanceItemDto>> CreateMaintenanceItem(
        [FromBody] MaintenanceItemDto maintenanceItemDto, Guid carId)
    {
        var createdItem = await _maintenanceItemEc.CreateMaintenanceItemAsync(maintenanceItemDto, carId);
        return CreatedAtAction(nameof(GetMaintenanceItemById), new { id = createdItem.Id }, createdItem);

    }

    // Read list of MaintenanceItems
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MaintenanceItemDto>>> GetMaintenanceItems()
    {
        var maintenanceItems = await _maintenanceItemEc.GetAllMaintenanceItemsAsync();
        return Ok(maintenanceItems);
    }
    
    // Get maintenanceItem by Id
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<MaintenanceItemDto>> GetMaintenanceItemById(Guid id)
    {
        var maintenanceItem = await _maintenanceItemEc.GetMaintenanceItemByIdAsync(id);
        if (maintenanceItem == null)
        {
            return NotFound();
        }
        return Ok(maintenanceItem);
    }
    
    // Update MaintenanceItem
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<MaintenanceItemDto>> UpdateMaintenanceItemById(Guid id,
        [FromBody] MaintenanceItemDto maintenanceItemDto)
    {
        if (maintenanceItemDto == null)
        {
            return BadRequest();
        }

        var updatedItem = await _maintenanceItemEc.UpdateMaintenanceItemAsync(id, maintenanceItemDto);
        if (updatedItem == null)
        {
            return NotFound();
        }
        return Ok(updatedItem);
    }
    
    // Delete MaintenanceItem by ID
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteMaintenanceItemById(Guid id)
    {
        var result = await _maintenanceItemEc.DeleteMaintenanceItemAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
}