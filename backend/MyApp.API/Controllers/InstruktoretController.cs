using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstruktoretController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InstruktoretController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Klasat
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Instruktoret>>> GetInstruktoret()
        {
            return await _context.Instruktoret.ToListAsync();
        }

       // GET: api/Instruktoret/5
            [HttpGet("{id}")]
            public async Task<ActionResult<Instruktoret>> GetInstruktor(int id)
            {
                var instruktor = await _context.Instruktoret.FindAsync(id);

                if (instruktor == null)
                {
                    return NotFound();
                }

                return instruktor;
            }

       // POST: api/Instruktoret
        [HttpPost]
        public async Task<ActionResult<Instruktoret>> PostInstruktor(Instruktoret instruktor)
        {
            _context.Instruktoret.Add(instruktor);
            await _context.SaveChangesAsync();

            // FIXED: Added 'instruktor' at the end before the closing parenthesis
            return CreatedAtAction(nameof(GetInstruktor), new { id = instruktor.instruktor_id }, instruktor);
        }

        // PUT: api/Klasat/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInstruktor(int id, Instruktoret instruktor)
        {
            if (id != instruktor.instruktor_id)
            {
                return BadRequest();
            }

            _context.Entry(instruktor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InstruktorExists(id))
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
        public async Task<IActionResult> DeleteInstruktor(int id)
        {
            var instruktor = await _context.Instruktoret.FindAsync(id);
            if (instruktor == null)
            {
                return NotFound();
            }

            _context.Instruktoret.Remove(instruktor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InstruktorExists(int id)
        {
            return _context.Instruktoret.Any(e => e.instruktor_id == id);
        }
    }
}