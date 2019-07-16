using System;
using System.Collections.Generic;

namespace mtrack.Models
{
  public class UserFlights
  {
    public int Id { get; set; }
    public string ICAO { get; set; }
    public string User { get; set; }
    public DateTime SaveTime { get; set; } = DateTime.Now;

  }




}