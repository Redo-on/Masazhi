using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KlasatController : ControllerBase
    {
        private readonly AppDbContext _context;

        public KlasatController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Klasat
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Klasat>>> GetKlasat()
        {
            return await _context.Klasat.ToListAsync();
        }

        // GET: api/Klasat/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Klasat>> GetKlase(int id)
        {
            var klase = await _context.Klasat.FindAsync(id);

            if (klase == null)
            {
                return NotFound();
            }

            return klase;
        }

        // POST: api/Klasat
        [HttpPost]
        public async Task<ActionResult<Klasat>> PostKlase(Klasat klase)
        {
            _context.Klasat.Add(klase);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetKlase), new { id = klase.klase_id }, klase);
        }

        // PUT: api/Klasat/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKlase(int id, Klasat klase)
        {
            if (id != klase.klase_id)
            {
                return BadRequest();
            }

            _context.Entry(klase).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KlaseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Klasat/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKlase(int id)
        {
            var klase = await _context.Klasat.FindAsync(id);
            if (klase == null)
            {
                return NotFound();
            }

            _context.Klasat.Remove(klase);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool KlaseExists(int id)
        {
            return _context.Klasat.Any(e => e.klase_id == id);
        }
    }
}