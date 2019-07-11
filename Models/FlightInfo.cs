using System;
using System.Collections.Generic;

namespace mtrack.Models
{
  public class FlightInfo
  {
    public int Id { get; set; }
    public DateTime SaveTime { get; set; } = DateTime.Now;
    public int Alt { get; set; } = 0;
    public int Altt { get; set; } = 0;
    public string Call { get; set; }
    public string Cou { get; set; }
    public int Galt { get; set; }
    public int Gnd { get; set; }
    public string ICAO { get; set; }
    public int Interested { get; set; } = 0;
    public int Lat { get; set; }
    public int Lon { get; set; }
    public int Mil { get; set; } = 1;
    public int Mlat { get; set; }
    public string Opicao { get; set; }
    public int Pos { get; set; }
    public int Postime { get; set; }
    public int Reg { get; set; }
    public int Sat { get; set; }
    public int Spd { get; set; }
    public int Sqk { get; set; }
    public int Talt { get; set; }
    public int Tisb { get; set; }
    public int Trak { get; set; }
    public int Trkh { get; set; }
    public int Trt { get; set; }
    public int Ttrk { get; set; }
    public string Type { get; set; }
    public int Vsi { get; set; }
    public int Vsit { get; set; }
    public int Wtc { get; set; }


  }
}