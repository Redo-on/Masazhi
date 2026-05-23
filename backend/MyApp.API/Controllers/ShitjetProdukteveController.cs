using Microsoft.AspNetCore.Mvc;
using MyApp.Application.Interfaces;
using MyApp.Domain;

namespace MyApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShitjetProdukteveController : ControllerBase
{
    private readonly IShitjetProdukteveService _service;

    public ShitjetProdukteveController(IShitjetProdukteveService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Shitjet_Produkteve>>> GetShitjetProdukteve()
    {
        var result = await _service.GetAllAsync();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Shitjet_Produkteve>> GetShitjetProdukteve(int id)
    {
        var result = await _service.GetByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<Shitjet_Produkteve>> CreateShitjetProdukteve(Shitjet_Produkteve shitje)
    {
        var created = await _service.CreateAsync(shitje);
        return CreatedAtAction(nameof(GetShitjetProdukteve), new { id = created.shitje_id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateShitjetProdukteve(int id, Shitjet_Produkteve shitje)
    {
        if (id != shitje.shitje_id) return BadRequest("ID mismatch");
        await _service.UpdateAsync(shitje);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteShitjetProdukteve(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}