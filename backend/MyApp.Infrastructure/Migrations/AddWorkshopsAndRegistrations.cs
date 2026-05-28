using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApp.Infrastructure.Migrations
{
    public partial class AddWorkshopsAndRegistrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Create the 'Workshopet' Table
            migrationBuilder.CreateTable(
                name: "Workshopet",
                columns: table => new
                {
                    workshop_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    data_ora = table.Column<DateTime>(type: "datetime2", nullable: false),
                    kapaciteti = table.Column<int>(type: "int", nullable: false),
                    cmimi = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workshopet", x => x.workshop_id);
                });

            // 2. Create the 'Regjistrimet_Workshop' Table
            migrationBuilder.CreateTable(
                name: "Regjistrimet_Workshop",
                columns: table => new
                {
                    rw_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    anetar_id = table.Column<int>(type: "int", nullable: false),
                    workshop_id = table.Column<int>(type: "int", nullable: false),
                    data_regjistrimit = table.Column<DateTime>(type: "datetime2", nullable: false),
                    statusi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Regjistrimet_Workshop", x => x.rw_id);
                    
                    // Foreign Key linking to your existing 'Anetaret' table
                    table.ForeignKey(
                        name: "FK_Regjistrimet_Workshop_Anetaret_anetar_id",
                        column: x => x.anetar_id,
                        principalTable: "Anetaret",
                        principalColumn: "anetar_id",
                        onDelete: ReferentialAction.Cascade);

                    // Foreign Key linking to the new 'Workshopet' table
                    table.ForeignKey(
                        name: "FK_Regjistrimet_Workshop_Workshopet_workshop_id",
                        column: x => x.workshop_id,
                        principalTable: "Workshopet",
                        principalColumn: "workshop_id",
                        onDelete: ReferentialAction.Cascade);
                });

            // 3. Create Performance Indexes for foreign key lookups
            migrationBuilder.CreateIndex(
                name: "IX_Regjistrimet_Workshop_anetar_id",
                table: "Regjistrimet_Workshop",
                column: "anetar_id");

            migrationBuilder.CreateIndex(
                name: "IX_Regjistrimet_Workshop_workshop_id",
                table: "Regjistrimet_Workshop",
                column: "workshop_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Drop tables in reverse order to avoid dependency errors
            migrationBuilder.DropTable(
                name: "Regjistrimet_Workshop");

            migrationBuilder.DropTable(
                name: "Workshopet");
        }
    }
}