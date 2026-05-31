using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Domain;
using MyApp.Infrastructure.Data; 

namespace MyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SallaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SallaController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/salla
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Salla>>> GetSalla()
        {
            return await _context.Sallat.ToListAsync();
        }

        // GET: api/salla/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Salla>> GetSalla(int id)
        {
            var salla = await _context.Sallat.FindAsync(id);

            if (salla == null)
            {
                return NotFound();
            }

            return salla;
        }

        // POST: api/salla
        [HttpPost]
        public async Task<ActionResult<Salla>> CreateSalla(Salla salla)
        {
            _context.Sallat.Add(salla);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSalla), new { id = salla.salla_id }, salla);
        }

        // PUT: api/salla/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSalla(int id, Salla salla)
        {
            if (id != salla.salla_id)
            {
                return BadRequest();
            }

            _context.Entry(salla).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/salla/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalla(int id)
        {
            var salla = await _context.Sallat.FindAsync(id);

            if (salla == null)
            {
                return NotFound();
            }

            _context.Sallat.Remove(salla);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}