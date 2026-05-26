using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Domain;
using MyApp.Infrastructure.Data; 


namespace MyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrariController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrariController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/orari
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orari>>> GetOrari()
        {
            return await _context.Orari.ToListAsync();
        }

        // GET: api/orari/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Orari>> GetOrari(int id)
        {
            var orari = await _context.Orari.FindAsync(id);

            if (orari == null)
            {
                return NotFound();
            }

            return orari;
        }

        // POST: api/orari
        [HttpPost]
        public async Task<ActionResult<Orari>> CreateOrari(Orari orari)
        {
            _context.Orari.Add(orari);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrari), new { id = orari.orar_id }, orari);
        }

        // PUT: api/orari/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrari(int id, Orari orari)
        {
            if (id != orari.orar_id)
            {
                return BadRequest();
            }

            _context.Entry(orari).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/orari/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrari(int id)
        {
            var orari = await _context.Orari.FindAsync(id);

            if (orari == null)
            {
                return NotFound();
            }

            _context.Orari.Remove(orari);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}