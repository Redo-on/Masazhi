using Microsoft.AspNetCore.Mvc;
using MyApp.Application.Interfaces;
using MyApp.Domain;

namespace MyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegjistrimetController : ControllerBase
    {
        private readonly IRegjistrimetService _regjistrimetService;

        public RegjistrimetController(IRegjistrimetService regjistrimetService)
        {
            _regjistrimetService = regjistrimetService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Regjistrimet>>> GetRegjistrimet()
        {
            var regjistrimet = await _regjistrimetService.GetAllAsync();
            return Ok(regjistrimet);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Regjistrimet>> GetRegjistrim(int id)
        {
            var regjistrim = await _regjistrimetService.GetByIdAsync(id);
            if (regjistrim == null) return NotFound();
            return Ok(regjistrim);
        }

        [HttpPost]
        public async Task<ActionResult<Regjistrimet>> PostRegjistrim(Regjistrimet regjistrim)
        {
            var createdRegjistrim = await _regjistrimetService.CreateAsync(regjistrim);
            return CreatedAtAction(nameof(GetRegjistrim), new { id = createdRegjistrim.regjistrim_id }, createdRegjistrim);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegjistrim(int id, Regjistrimet regjistrim)
        {
            var success = await _regjistrimetService.UpdateAsync(id, regjistrim);
            if (!success) return BadRequest();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegjistrim(int id)
        {
            var success = await _regjistrimetService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}