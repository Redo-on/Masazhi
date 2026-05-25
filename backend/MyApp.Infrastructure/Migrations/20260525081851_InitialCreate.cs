using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Anetaret",
                columns: table => new
                {
                    anetar_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    emri = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    mbiemri = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    data_lindjes = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    gjinia = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    telefoni = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    adresa = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    data_regjistrimit = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    lloji_anetaresimit = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    statusi = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Anetaret", x => x.anetar_id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Instruktoret",
                columns: table => new
                {
                    instruktor_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    emri = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    mbiemri = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    specializimi = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    certifikimet = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    telefoni = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    biografia = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    data_fillimit = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    tarifa_orare = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instruktoret", x => x.instruktor_id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Klasat",
                columns: table => new
                {
                    klase_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    emri = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    pershkrimi = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    lloji = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    niveli = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    kohezgjatja_min = table.Column<int>(type: "int", nullable: false),
                    kapaciteti_max = table.Column<int>(type: "int", nullable: false),
                    instruktor_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klasat", x => x.klase_id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Orari",
                columns: table => new
                {
                    orar_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    klasa_id = table.Column<int>(type: "int", nullable: false),
                    dita_javes = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ora_fillimit = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ora_perfundimit = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    salla_id = table.Column<int>(type: "int", nullable: false),
                    statusi = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orari", x => x.orar_id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Produktet",
                columns: table => new
                {
                    produkti_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    emri = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    pershkrimi = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    kategoria = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    cmimi = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    sasia_stok = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produktet", x => x.produkti_id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Regjistrimet_Workshop",
                columns: table => new
                {
                    rw_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    workshop_id = table.Column<int>(type: "int", nullable: false),
                    anetar_id = table.Column<int>(type: "int", nullable: false),
                    data_regjistrimit = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    statusi_pageses = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Regjistrimet_Workshop", x => x.rw_id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Sallat",
                columns: table => new
                {
                    salla_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    emri = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    kapaciteti = table.Column<int>(type: "int", nullable: false),
                    pajisjet = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    pershkrimi = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sallat", x => x.salla_id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Workshopet",
                columns: table => new
                {
                    workshop_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    titulli = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    pershkrimi = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    instruktor_id = table.Column<int>(type: "int", nullable: false),
                    data = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ora_fillimit = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ora_perfundimit = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    cmimi = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    kapaciteti = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workshopet", x => x.workshop_id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Anetaresimet",
                columns: table => new
                {
                    anetaresimi_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    anetar_id = table.Column<int>(type: "int", nullable: false),
                    lloji = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    cmimi = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    data_fillimit = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    data_mbarimit = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    statusi = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Anetaresimet", x => x.anetaresimi_id);
                    table.ForeignKey(
                        name: "FK_Anetaresimet_Anetaret_anetar_id",
                        column: x => x.anetar_id,
                        principalTable: "Anetaret",
                        principalColumn: "anetar_id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Regjistrimet",
                columns: table => new
                {
                    regjistrim_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    anetar_id = table.Column<int>(type: "int", nullable: false),
                    orar_id = table.Column<int>(type: "int", nullable: false),
                    data = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    statusi = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    shenimet = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Regjistrimet", x => x.regjistrim_id);
                    table.ForeignKey(
                        name: "FK_Regjistrimet_Anetaret_anetar_id",
                        column: x => x.anetar_id,
                        principalTable: "Anetaret",
                        principalColumn: "anetar_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Regjistrimet_Orari_orar_id",
                        column: x => x.orar_id,
                        principalTable: "Orari",
                        principalColumn: "orar_id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Shitjet_Produkteve",
                columns: table => new
                {
                    shitje_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    anetar_id = table.Column<int>(type: "int", nullable: false),
                    produkti_id = table.Column<int>(type: "int", nullable: false),
                    sasia = table.Column<int>(type: "int", nullable: false),
                    cmimi_total = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    data = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shitjet_Produkteve", x => x.shitje_id);
                    table.ForeignKey(
                        name: "FK_Shitjet_Produkteve_Anetaret_anetar_id",
                        column: x => x.anetar_id,
                        principalTable: "Anetaret",
                        principalColumn: "anetar_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Shitjet_Produkteve_Produktet_produkti_id",
                        column: x => x.produkti_id,
                        principalTable: "Produktet",
                        principalColumn: "produkti_id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Pagesat",
                columns: table => new
                {
                    pagese_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    anetar_id = table.Column<int>(type: "int", nullable: false),
                    anetaresim_id = table.Column<int>(type: "int", nullable: false),
                    data_pageses = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    shuma = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    metoda = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    statusi = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pagesat", x => x.pagese_id);
                    table.ForeignKey(
                        name: "FK_Pagesat_Anetaresimet_anetaresim_id",
                        column: x => x.anetaresim_id,
                        principalTable: "Anetaresimet",
                        principalColumn: "anetaresimi_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Pagesat_Anetaret_anetar_id",
                        column: x => x.anetar_id,
                        principalTable: "Anetaret",
                        principalColumn: "anetar_id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Anetaresimet_anetar_id",
                table: "Anetaresimet",
                column: "anetar_id");

            migrationBuilder.CreateIndex(
                name: "IX_Pagesat_anetar_id",
                table: "Pagesat",
                column: "anetar_id");

            migrationBuilder.CreateIndex(
                name: "IX_Pagesat_anetaresim_id",
                table: "Pagesat",
                column: "anetaresim_id");

            migrationBuilder.CreateIndex(
                name: "IX_Regjistrimet_anetar_id",
                table: "Regjistrimet",
                column: "anetar_id");

            migrationBuilder.CreateIndex(
                name: "IX_Regjistrimet_orar_id",
                table: "Regjistrimet",
                column: "orar_id");

            migrationBuilder.CreateIndex(
                name: "IX_Shitjet_Produkteve_anetar_id",
                table: "Shitjet_Produkteve",
                column: "anetar_id");

            migrationBuilder.CreateIndex(
                name: "IX_Shitjet_Produkteve_produkti_id",
                table: "Shitjet_Produkteve",
                column: "produkti_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Instruktoret");

            migrationBuilder.DropTable(
                name: "Klasat");

            migrationBuilder.DropTable(
                name: "Pagesat");

            migrationBuilder.DropTable(
                name: "Regjistrimet");

            migrationBuilder.DropTable(
                name: "Regjistrimet_Workshop");

            migrationBuilder.DropTable(
                name: "Sallat");

            migrationBuilder.DropTable(
                name: "Shitjet_Produkteve");

            migrationBuilder.DropTable(
                name: "Workshopet");

            migrationBuilder.DropTable(
                name: "Anetaresimet");

            migrationBuilder.DropTable(
                name: "Orari");

            migrationBuilder.DropTable(
                name: "Produktet");

            migrationBuilder.DropTable(
                name: "Anetaret");
        }
    }
}
