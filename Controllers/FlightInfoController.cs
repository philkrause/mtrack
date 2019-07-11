using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using mtrack.Models;
using Microsoft.AspNetCore.Authorization;


namespace mtrack.Controllers
{

  [Route("[controller]")]
  [Authorize]
  public class FlightInfoController
  {
    private readonly DatabaseContext _context;

    public FlightInfoController(DatabaseContext context)

    {
      _context = context;
    }

    [HttpPost("addflight")]
    public ActionResult<FlightInfo> PostFlight([FromBody]FlightInfo flightinfo)
    {

      _context.FlightTable.Add(flightinfo);
      _context.SaveChanges();
      return flightinfo;
    }

  }
}