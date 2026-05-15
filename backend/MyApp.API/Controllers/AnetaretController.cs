using Microsoft.AspNetCore.Mvc;
using MyApp.Domain; // This allows the controller to "see" your 4 entities

namespace MyApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnetaretController : ControllerBase
{
    // 1. Members Endpoints (Anetaret)
    [HttpGet]
    public ActionResult<IEnumerable<Anetaret>> GetAnetaret()
    {
        return Ok(new List<Anetaret>()); // Returns an empty list of Anetaret
    }

    // 2. Instructors Endpoints (Instruktoret)
    [HttpGet("instruktoret")]
    public ActionResult<IEnumerable<Instruktoret>> GetInstruktoret()
    {
        return Ok(new List<Instruktoret>());
    }

    // 3. Classes Endpoints (Klasat)
    [HttpGet("klasat")]
    public ActionResult<IEnumerable<Klasat>> GetKlasat()
    {
        return Ok(new List<Klasat>());
    }

    // 4. Memberships Endpoints (Anetaresimet)
    [HttpGet("anetaresimet")]
    public ActionResult<IEnumerable<Anetaresimet>> GetAnetaresimet()
    {
        return Ok(new List<Anetaresimet>());
    }

    // 5. Registration Endpoints (Regjistrimet)
    [HttpGet("regjistrimet")]
    public ActionResult<IEnumerable<Regjistrimet>> GetRegjistrimet()
    {
        return Ok(new List<Regjistrimet>());
    }

    [HttpPost("regjistrimet")]
    public ActionResult<Regjistrimet> CreateRegjistrimet(Regjistrimet regjistrim)
    {
        return CreatedAtAction(nameof(GetRegjistrimet), new { id = regjistrim.regjistrim_id }, regjistrim);
    }

    // 6. Payment Endpoints (Pagesat)
    [HttpGet("pagesat")]
    public ActionResult<IEnumerable<Pagesat>> GetPagesat()
    {
        return Ok(new List<Pagesat>());
    }

    [HttpPost("pagesat")]
    public ActionResult<Pagesat> CreatePagesat(Pagesat pagesa)
    {
        return CreatedAtAction(nameof(GetPagesat), new { id = pagesa.pagese_id }, pagesa);
    }
}