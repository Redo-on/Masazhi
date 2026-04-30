using Microsoft.AspNetCore.Mvc;
using MyApp.Domain;

namespace MyApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProduktetController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Produktet>> GetProduktet()
    {
        return Ok(new List<Produktet>());
    }

    [HttpGet("{id}")]
    public ActionResult<Produktet> GetProduktet(int id)
    {
        // Placeholder - return null or a sample
        return Ok(new Produktet { produkti_id = id, emri = "Sample Product" });
    }

    [HttpPost]
    public ActionResult<Produktet> CreateProduktet(Produktet produktet)
    {
        // Placeholder - just return the input
        return CreatedAtAction(nameof(GetProduktet), new { id = produktet.produkti_id }, produktet);
    }
}