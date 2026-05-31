using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Domain;
using MyApp.Infrastructure.Data;

namespace MyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkshopetController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WorkshopetController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Workshopet
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workshop>>> GetWorkshopet()
        {
            return await _context.Workshopet.ToListAsync();
        }

        // GET: api/Workshopet/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Workshop>> GetWorkshop(int id)
        {
            var workshop = await _context.Workshopet.FindAsync(id);

            if (workshop == null)
            {
                return NotFound();
            }

            return workshop;
        }

        // POST: api/Workshopet
        [HttpPost]
        public async Task<ActionResult<Workshop>> PostWorkshop(Workshop workshop)
        {
            _context.Workshopet.Add(workshop);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWorkshop), new { id = workshop.workshop_id }, workshop);
        }

        // PUT: api/Workshopet/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkshop(int id, Workshop workshop)
        {
            if (id != workshop.workshop_id)
            {
                return BadRequest();
            }

            _context.Entry(workshop).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkshopExists(id))
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

        // DELETE: api/Workshopet/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkshop(int id)
        {
            var workshop = await _context.Workshopet.FindAsync(id);
            if (workshop == null)
            {
                return NotFound();
            }

            _context.Workshopet.Remove(workshop);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WorkshopExists(int id)
        {
            return _context.Workshopet.Any(e => e.workshop_id == id);
        }
    }
}