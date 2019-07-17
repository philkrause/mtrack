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
  [ApiController]
  [Authorize]


  public class UserController : ControllerBase
  {
    private readonly DatabaseContext _context;
    public UserController(DatabaseContext context)
    {
      _context = context;
    }

    private string _getUserId(System.Security.Claims.ClaimsPrincipal user)

    {
      var userId = User.Claims.First(f => f.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
      return userId;
    }

    [HttpPost("{icao}/adduserflight")]
    public ActionResult<UserFlights> PostFlight([FromRoute] string icao)
    {
      var userId = _getUserId(User);
      var data = new UserFlights
      {
        User = userId,
        ICAO = icao
      };
      _context.UserFlightTable.Add(data);
      _context.SaveChanges();
      return data;
    }

    [HttpGet("allusers")]

    public ActionResult<List<UserFlights>> AllUsers()
    {
      var all = _context.UserFlightTable.ToList();
      return all;
    }


    [HttpGet("alluserflights")]
    public IOrderedQueryable<FlightInfo> GetUserFlights()
    {
      var userId = _getUserId(User);
      var icaoUser = _context.UserFlightTable
      .Where(w => w.User == userId)
      .Select(s => s.ICAO);


      var data = _context.FlightTable.Where(f => icaoUser.Contains(f.ICAO)).OrderBy(o => o.SaveTime);
      return data;

    }

  }


}