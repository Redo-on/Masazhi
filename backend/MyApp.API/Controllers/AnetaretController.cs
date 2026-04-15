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
}