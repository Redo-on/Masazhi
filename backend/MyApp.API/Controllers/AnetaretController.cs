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
    private readonly IRegjistrimetService _regjistrimetService;
    private readonly IPagesatService _pagesatService;

    public AnetaretController(
        IAnetaretService anetaretService, 
        IRegjistrimetService regjistrimetService, 
        IPagesatService pagesatService)
    {
        _anetaretService = anetaretService;
        _regjistrimetService = regjistrimetService;
        _pagesatService = pagesatService;
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

        // 5. Registration Endpoints (Regjistrimet)
    [HttpGet("regjistrimet")]
    public async Task<ActionResult<IEnumerable<Regjistrimet>>> GetRegjistrimet()
    {
        var regjistrimet = await _regjistrimetService.GetAllAsync();
        return Ok(regjistrimet);
    }

    [HttpPost("regjistrimet")]
    public async Task<ActionResult<Regjistrimet>> CreateRegjistrimet(Regjistrimet regjistrim)
    {
        var createdRegjistrim = await _regjistrimetService.CreateAsync(regjistrim);
        return CreatedAtAction(nameof(GetRegjistrimet), new { id = createdRegjistrim.regjistrim_id }, createdRegjistrim);
    }

    // 6. Payment Endpoints (Pagesat)
    [HttpGet("pagesat")]
    public async Task<ActionResult<IEnumerable<Pagesat>>> GetPagesat()
    {
        var pagesat = await _pagesatService.GetAllAsync();
        return Ok(pagesat);
    }

    [HttpPost("pagesat")]
    public async Task<ActionResult<Pagesat>> CreatePagesat(Pagesat pagesa)
    {
        var createdPagesa = await _pagesatService.CreateAsync(pagesa);
        return CreatedAtAction(nameof(GetPagesat), new { id = createdPagesa.pagese_id }, createdPagesa);
        }
    }
}
