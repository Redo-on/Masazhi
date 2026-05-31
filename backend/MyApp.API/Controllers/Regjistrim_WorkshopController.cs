using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Regjistrim_WorkshopController : ControllerBase
    {
        private readonly AppDbContext _context;

        public Regjistrim_WorkshopController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Regjistrim_Workshop
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Regjistrimi_Workshop>>> GetRegjistrimet()
        {
            return await _context.Regjistrimet_Workshop.ToListAsync();
        }

        // GET: api/Regjistrim_Workshop/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Regjistrimi_Workshop>> GetRegjistrim(int id)
        {
            var regjistrim = await _context.Regjistrimet_Workshop.FindAsync(id);

            if (regjistrim == null)
            {
                return NotFound();
            }

            return regjistrim;
        }

        // POST: api/Regjistrim_Workshop
        [HttpPost]
        public async Task<ActionResult<Regjistrimi_Workshop>> PostRegjistrim(Regjistrimi_Workshop regjistrim)
        {
            _context.Regjistrimet_Workshop.Add(regjistrim);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRegjistrim), new { id = regjistrim.rw_id }, regjistrim);
        }

        // PUT: api/Regjistrim_Workshop/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegjistrim(int id, Regjistrimi_Workshop regjistrim)
        {
            // Validating against the correct primary key defined in your entity (rw_id)
            if (id != regjistrim.rw_id)
            {
                return BadRequest();
            }

            _context.Entry(regjistrim).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegjistrimExists(id))
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

        // DELETE: api/Regjistrim_Workshop/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegjistrim(int id)
        {
            var regjistrim = await _context.Regjistrimet_Workshop.FindAsync(id);
            if (regjistrim == null)
            {
                return NotFound();
            }

            _context.Regjistrimet_Workshop.Remove(regjistrim);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegjistrimExists(int id)
        {
            return _context.Regjistrimet_Workshop.Any(e => e.rw_id == id);
        }
    }
}