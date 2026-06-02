using System.Collections.Concurrent;
using Microsoft.AspNetCore.Mvc;
using MyApp.Application.Interfaces;
using MyApp.Domain;

namespace MyApp.API.Controllers;

public class CreateProduktetRequest
{
    public string emri { get; set; } = string.Empty;
    public string pershkrimi { get; set; } = string.Empty;
    public string kategoria { get; set; } = string.Empty;
    public decimal cmimi { get; set; }
    public int sasia_stok { get; set; }
    public string? idempotency_token { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class ProduktetController : ControllerBase
{
    private static readonly ConcurrentDictionary<string, int> _idempotencyMap = new();
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
    public async Task<ActionResult<Produktet>> CreateProduktet(CreateProduktetRequest request)
    {
        if (!string.IsNullOrWhiteSpace(request.idempotency_token)
            && _idempotencyMap.TryGetValue(request.idempotency_token, out var existingId))
        {
            var existingProduct = await _service.GetByIdAsync(existingId);
            if (existingProduct != null)
            {
                return Ok(existingProduct);
            }
        }

        var existingDuplicate = await _service.GetByNameAndCategoryAsync(request.emri, request.kategoria);
        if (existingDuplicate != null)
        {
            return Conflict(new { message = "Produkt me të njëjtin emër dhe kategori ekziston tashmë.", existingProduct = existingDuplicate });
        }

        var produktet = new Produktet
        {
            emri = request.emri,
            pershkrimi = request.pershkrimi,
            kategoria = request.kategoria,
            cmimi = request.cmimi,
            sasia_stok = request.sasia_stok,
        };

        var created = await _service.CreateAsync(produktet);
        if (!string.IsNullOrWhiteSpace(request.idempotency_token))
        {
            _idempotencyMap.TryAdd(request.idempotency_token, created.produkti_id);
        }

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