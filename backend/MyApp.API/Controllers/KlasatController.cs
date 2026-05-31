using Microsoft.AspNetCore.Mvc;
using MyApp.Application.Interfaces;
using MyApp.Domain;

namespace MyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KlasatController : ControllerBase
    {
        private readonly IKlasatService _klasatService;

        public KlasatController(IKlasatService klasatService)
        {
            _klasatService = klasatService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Klasat>>> GetKlasat()
        {
            var klasat = await _klasatService.GetAllAsync();
            return Ok(klasat);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Klasat>> GetKlasa(int id)
        {
            var klasa = await _klasatService.GetByIdAsync(id);
            if (klasa == null) return NotFound();
            return Ok(klasa);
        }

        [HttpPost]
        public async Task<ActionResult<Klasat>> PostKlasa(Klasat klasa)
        {
            var createdKlasa = await _klasatService.CreateAsync(klasa);
            return CreatedAtAction(nameof(GetKlasa), new { id = createdKlasa.klase_id }, createdKlasa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutKlasa(int id, Klasat klasa)
        {
            var success = await _klasatService.UpdateAsync(id, klasa);
            if (!success) return BadRequest();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKlasa(int id)
        {
            var success = await _klasatService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}