using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnetaresimetController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AnetaresimetController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Anetaresimet>>> GetAnetaresimet()
        {
            return await _context.Anetaresimet.ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Anetaresimet>> GetAnetaresim(int id)
        {
            var anetaresim = await _context.Anetaresimet.FindAsync(id);

            if (anetaresim == null)
            {
                return NotFound();
            }

            return anetaresim;
        }

        
        [HttpPost]
        public async Task<ActionResult<Anetaresimet>> PostAnetaresim(Anetaresimet anetaresim)
        {
            _context.Anetaresimet.Add(anetaresim);
            await _context.SaveChangesAsync();

            // Note: Update "anetaresimi_id" if your primary key property is named differently (e.g., "Id")
            return CreatedAtAction(nameof(GetAnetaresim), new { id = anetaresim.anetaresimi_id }, anetaresim);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnetaresim(int id, Anetaresimet anetaresim)
        {
            // Note: Update "anetaresimi_id" if your primary key property is named differently
            if (id != anetaresim.anetaresimi_id)
            {
                return BadRequest();
            }

            _context.Entry(anetaresim).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnetaresimExists(id))
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

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnetaresim(int id)
        {
            var anetaresim = await _context.Anetaresimet.FindAsync(id);
            if (anetaresim == null)
            {
                return NotFound();
            }

            _context.Anetaresimet.Remove(anetaresim);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnetaresimExists(int id)
        {
            // Note: Update "anetaresimi_id" if your primary key property is named differently
            return _context.Anetaresimet.Any(e => e.anetaresimi_id == id);
        }
    }
}