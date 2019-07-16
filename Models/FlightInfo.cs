using System;
using System.Collections.Generic;

namespace mtrack.Models
{
  public class FlightInfo
  {
    public int Id { get; set; }
    public DateTime SaveTime { get; set; } = DateTime.Now;
    public string Alt { get; set; }
    public string Altt { get; set; }
    public string Call { get; set; }
    public string Cou { get; set; }
    public string Galt { get; set; }
    public string Gnd { get; set; }
    public string ICAO { get; set; }
    public string Interested { get; set; }
    public string Lat { get; set; }
    public string Lon { get; set; }
    public string Mil { get; set; }
    public string Mlat { get; set; }
    public string Opicao { get; set; }
    public string Pos { get; set; }
    public string Postime { get; set; }
    public string Reg { get; set; }
    public string Sat { get; set; }
    public string Spd { get; set; }
    public string Sqk { get; set; }
    public string Talt { get; set; }
    public string Tisb { get; set; }
    public string Trak { get; set; }
    public string Trkh { get; set; }
    public string Trt { get; set; }
    public string Ttrk { get; set; }
    public string Type { get; set; }
    public string Vsi { get; set; }
    public string Vsit { get; set; }
    public string Wtc { get; set; }


  }
}