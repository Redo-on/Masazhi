using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PagesatController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PagesatController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Pagesat
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pagesat>>> GetPagesat()
        {
            return await _context.Pagesat.ToListAsync();
        }

        // GET: api/Pagesat/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pagesat>> GetPagese(int id)
        {
            var pagese = await _context.Pagesat.FindAsync(id);

            if (pagese == null)
            {
                return NotFound();
            }

            return pagese;
        }

        // POST: api/Pagesat
        [HttpPost]
        public async Task<ActionResult<Pagesat>> PostPagese(Pagesat pagese)
        {
            _context.Pagesat.Add(pagese);
            await _context.SaveChangesAsync();

            // Note: If your primary key column inside Pagesat.cs is named differently (e.g. pagesa_id), change it here
            return CreatedAtAction(nameof(GetPagese), new { id = pagese.pagese_id }, pagese);
        }

        // PUT: api/Pagesat/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPagese(int id, Pagesat pagese)
        {
            if (id != pagese.pagese_id)
            {
                return BadRequest();
            }

            _context.Entry(pagese).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PageseExists(id))
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

        // DELETE: api/Pagesat/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePagese(int id)
        {
            var pagese = await _context.Pagesat.FindAsync(id);
            if (pagese == null)
            {
                return NotFound();
            }

            _context.Pagesat.Remove(pagese);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PageseExists(int id)
        {
            return _context.Pagesat.Any(e => e.pagese_id == id);
        }
    }
}