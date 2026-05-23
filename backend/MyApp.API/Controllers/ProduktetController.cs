using Microsoft.AspNetCore.Mvc;
using MyApp.Application.Interfaces;
using MyApp.Domain;

namespace MyApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProduktetController : ControllerBase
{
    private readonly IProduktetService _service;

    public ProduktetController(IProduktetService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Produktet>>> GetProduktet()
    {
        var result = await _service.GetAllAsync();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Produktet>> GetProduktet(int id)
    {
        var result = await _service.GetByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<Produktet>> CreateProduktet(Produktet produktet)
    {
        var created = await _service.CreateAsync(produktet);
        return CreatedAtAction(nameof(GetProduktet), new { id = created.produkti_id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduktet(int id, Produktet produktet)
    {
        if (id != produktet.produkti_id) return BadRequest("ID mismatch");
        await _service.UpdateAsync(produktet);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduktet(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}