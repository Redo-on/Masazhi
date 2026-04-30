using Microsoft.AspNetCore.Mvc;
using MyApp.Domain;

namespace MyApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShitjetProdukteveController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Shitjet_Produkteve>> GetShitjetProdukteve()
    {
        return Ok(new List<Shitjet_Produkteve>());
    }

    [HttpGet("{id}")]
    public ActionResult<Shitjet_Produkteve> GetShitjetProdukteve(int id)
    {
        // Placeholder - return null or a sample
        return Ok(new Shitjet_Produkteve { shitje_id = id, data = DateTime.Now });
    }

    [HttpPost]
    public ActionResult<Shitjet_Produkteve> CreateShitjetProdukteve(Shitjet_Produkteve shitje)
    {
        // Placeholder - just return the input
        return CreatedAtAction(nameof(GetShitjetProdukteve), new { id = shitje.shitje_id }, shitje);
    }
}