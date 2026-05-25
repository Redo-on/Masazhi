using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Domain;
using MyApp.Infrastructure.Data; 

namespace MyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnetaretController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AnetaretController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Anetaret
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Anetaret>>> GetAnetaret()
        {
            return await _context.Anetaret.ToListAsync();
        }

        // GET: api/Anetaret/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Anetaret>> GetAnetar(int id)
        {
            var anetar = await _context.Anetaret.FindAsync(id);

            if (anetar == null)
            {
                return NotFound();
            }

            return anetar;
        }

        // POST: api/Anetaret
        [HttpPost]
        public async Task<ActionResult<Anetaret>> PostAnetar(Anetaret anetar)
        {
            _context.Anetaret.Add(anetar);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAnetar), new { id = anetar.anetar_id }, anetar);
        }

        // PUT: api/Anetaret/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnetar(int id, Anetaret anetar)
        {
            if (id != anetar.anetar_id)
            {
                return BadRequest();
            }

            _context.Entry(anetar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnetarExists(id))
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

        // DELETE: api/Anetaret/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnetar(int id)
        {
            var anetar = await _context.Anetaret.FindAsync(id);
            if (anetar == null)
            {
                return NotFound();
            }

            _context.Anetaret.Remove(anetar);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnetarExists(int id)
        {
            return _context.Anetaret.Any(e => e.anetar_id == id);
        }
    }
}