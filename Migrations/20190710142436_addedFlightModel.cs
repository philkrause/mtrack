using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace sdgreacttemplate.Migrations
{
    public partial class addedFlightModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FlightTable",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    SaveTime = table.Column<DateTime>(nullable: false),
                    Alt = table.Column<int>(nullable: false),
                    Altt = table.Column<int>(nullable: false),
                    Call = table.Column<string>(nullable: true),
                    Cou = table.Column<string>(nullable: true),
                    Galt = table.Column<int>(nullable: false),
                    Gnd = table.Column<int>(nullable: false),
                    ICAO = table.Column<string>(nullable: true),
                    Interested = table.Column<int>(nullable: false),
                    Lat = table.Column<int>(nullable: false),
                    Lon = table.Column<int>(nullable: false),
                    Mil = table.Column<int>(nullable: false),
                    Mlat = table.Column<int>(nullable: false),
                    Opicao = table.Column<string>(nullable: true),
                    Pos = table.Column<int>(nullable: false),
                    Postime = table.Column<int>(nullable: false),
                    Reg = table.Column<int>(nullable: false),
                    Sat = table.Column<int>(nullable: false),
                    Spd = table.Column<int>(nullable: false),
                    Sqk = table.Column<int>(nullable: false),
                    Talt = table.Column<int>(nullable: false),
                    Tisb = table.Column<int>(nullable: false),
                    Trak = table.Column<int>(nullable: false),
                    Trkh = table.Column<int>(nullable: false),
                    Trt = table.Column<int>(nullable: false),
                    Ttrk = table.Column<int>(nullable: false),
                    Type = table.Column<string>(nullable: true),
                    Vsi = table.Column<int>(nullable: false),
                    Vsit = table.Column<int>(nullable: false),
                    Wtc = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightTable", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlightTable");
        }
    }
}
