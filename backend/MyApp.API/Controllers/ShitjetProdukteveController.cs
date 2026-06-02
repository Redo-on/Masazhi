using System.Numerics;
using Microsoft.AspNetCore.Mvc;
using MyApp.Application.Interfaces;
using MyApp.Application.Services;
using MyApp.Domain;

namespace MyApp.API.Controllers;

[ApiController]
[Route("api/[controller]")] // This routes exactly to /api/ShitjetProdukteve as expected by React
public class ShitjetProdukteveController : ControllerBase
{
    private readonly IShitjetProdukteveService _shitjetService;

    public ShitjetProdukteveController(IShitjetProdukteveService shitjetService)
    {
        _shitjetService = shitjetService;
    }

    // GET: api/ShitjetProdukteve
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var sales = await _shitjetService.GetAllAsync();
        return Ok(sales);
    }

    // GET: api/ShitjetProdukteve/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var sale = await _shitjetService.GetByIdAsync(id);
        if (sale == null) return NotFound();
        return Ok(sale);
    }

    // POST: api/ShitjetProdukteve
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Shitjet_Produkteve shitje)
    {
       try
        {
            var created = await _shitjetService.CreateAsync(shitje);
            
            return CreatedAtAction(nameof(GetById), new { id = created.shitje_id }, created);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }

    // PUT: api/ShitjetProdukteve/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Shitjet_Produkteve shitje)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updated = await _shitjetService.UpdateAsync(id, shitje);
        if (!updated) return NotFound();

        return NoContent();
    }

    // DELETE: api/ShitjetProdukteve/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _shitjetService.DeleteAsync(id);
        if (!deleted) return NotFound();

        return NoContent();
    }
}