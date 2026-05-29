using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegjistrimetController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RegjistrimetController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Regjistrimet
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Regjistrimet>>> GetRegjistrimet()
        {
            return await _context.Regjistrimet.ToListAsync();
        }

        // GET: api/Regjistrimet/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Regjistrimet>> GetRegjistrim(int id)
        {
            var regjistrim = await _context.Regjistrimet.FindAsync(id);

            if (regjistrim == null)
            {
                return NotFound();
            }

            return regjistrim;
        }

        // POST: api/Regjistrimet
        [HttpPost]
        public async Task<ActionResult<Regjistrimet>> PostRegjistrim(Regjistrimet regjistrim)
        {
            _context.Regjistrimet.Add(regjistrim);
            await _context.SaveChangesAsync();

            // Note: Update "regjistrimi_id" if your primary key property is named differently
            return CreatedAtAction(nameof(GetRegjistrim), new { id = regjistrim.regjistrim_id }, regjistrim);
        }

        // PUT: api/Regjistrimet/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegjistrim(int id, Regjistrimet regjistrim)
        {
            // Note: Update "regjistrimi_id" if your primary key property is named differently
            if (id != regjistrim.regjistrim_id)
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

        // DELETE: api/Regjistrimet/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegjistrim(int id)
        {
            var regjistrim = await _context.Regjistrimet.FindAsync(id);
            if (regjistrim == null)
            {
                return NotFound();
            }

            _context.Regjistrimet.Remove(regjistrim);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegjistrimExists(int id)
        {
            // Note: Update "regjistrimi_id" if your primary key property is named differently
            return _context.Regjistrimet.Any(e => e.regjistrim_id == id);
        }
    }
}