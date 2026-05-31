using MyApp.Domain;
using MyApp.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnetaretController : ControllerBase
    {
        private readonly IAnetaretService _anetaretService;

        
        public AnetaretController(IAnetaretService anetaretService)
        {
            _anetaretService = anetaretService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Anetaret>>> GetAnetaret()
        {
            var anetaret = await _anetaretService.GetAllAsync();
            return Ok(anetaret);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Anetaret>> GetAnetar(int id)
        {
            var anetar = await _anetaretService.GetByIdAsync(id);
            if (anetar == null) return NotFound();
            return Ok(anetar);
        }

        [HttpPost]
        public async Task<ActionResult<Anetaret>> PostAnetar(Anetaret anetar)
        {
            var createdAnetar = await _anetaretService.CreateAsync(anetar);
            return CreatedAtAction(nameof(GetAnetar), new { id = createdAnetar.anetar_id }, createdAnetar);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnetar(int id, Anetaret anetar)
        {
            var success = await _anetaretService.UpdateAsync(id, anetar);
            if (!success) return BadRequest();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnetar(int id)
        {
            var success = await _anetaretService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }

    // 5. Registration Endpoints (Regjistrimet)
    [HttpGet("regjistrimet")]
    public ActionResult<IEnumerable<Regjistrimet>> GetRegjistrimet()
    {
        return Ok(new List<Regjistrimet>());
    }

    [HttpPost("regjistrimet")]
    public ActionResult<Regjistrimet> CreateRegjistrimet(Regjistrimet regjistrim)
    {
        return CreatedAtAction(nameof(GetRegjistrimet), new { id = regjistrim.regjistrim_id }, regjistrim);
    }

    // 6. Payment Endpoints (Pagesat)
    [HttpGet("pagesat")]
    public ActionResult<IEnumerable<Pagesat>> GetPagesat()
    {
        return Ok(new List<Pagesat>());
    }

    [HttpPost("pagesat")]
    public ActionResult<Pagesat> CreatePagesat(Pagesat pagesa)
    {
        return CreatedAtAction(nameof(GetPagesat), new { id = pagesa.pagese_id }, pagesa);
    }
}