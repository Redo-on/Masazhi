using Microsoft.AspNetCore.Mvc;
using MyApp.Application.Interfaces;
using MyApp.Domain;

namespace MyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InstruktoretController : ControllerBase
    {
        private readonly IInstruktoretService _instruktoretService;

        public InstruktoretController(IInstruktoretService instruktoretService)
        {
            _instruktoretService = instruktoretService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Instruktoret>>> GetInstruktoret()
        {
            var instruktoret = await _instruktoretService.GetAllAsync();
            return Ok(instruktoret);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Instruktoret>> GetInstruktor(int id)
        {
            var instruktor = await _instruktoretService.GetByIdAsync(id);
            if (instruktor == null) return NotFound();
            return Ok(instruktor);
        }

        [HttpPost]
        public async Task<ActionResult<Instruktoret>> PostInstruktor(Instruktoret instruktor)
        {
            var createdInstruktor = await _instruktoretService.CreateAsync(instruktor);
            return CreatedAtAction(nameof(GetInstruktor), new { id = createdInstruktor.instruktor_id }, createdInstruktor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutInstruktor(int id, Instruktoret instruktor)
        {
            var success = await _instruktoretService.UpdateAsync(id, instruktor);
            if (!success) return BadRequest();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInstruktor(int id)
        {
            var success = await _instruktoretService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}