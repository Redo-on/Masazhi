using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddNewEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Workshops",
                table: "Workshops");

            migrationBuilder.RenameTable(
                name: "Workshops",
                newName: "Workshop");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Workshop",
                table: "Workshop",
                column: "workshop_id");

            migrationBuilder.CreateTable(
                name: "Orari",
                columns: table => new
                {
                    orari_id = table.Column<int>(type: "int", nullable: false)
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
                    table.PrimaryKey("PK_Orari", x => x.orari_id);
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
                    cmimi = table.Column<double>(type: "double", nullable: false),
                    sasia_stock = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produktet", x => x.produkti_id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Regjistrimi_Workshop",
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
                    table.PrimaryKey("PK_Regjistrimi_Workshop", x => x.rw_id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Salla",
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
                    table.PrimaryKey("PK_Salla", x => x.salla_id);
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
                    cmimi_total = table.Column<double>(type: "double", nullable: false),
                    data = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shitjet_Produkteve", x => x.shitje_id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orari");

            migrationBuilder.DropTable(
                name: "Produktet");

            migrationBuilder.DropTable(
                name: "Regjistrimi_Workshop");

            migrationBuilder.DropTable(
                name: "Salla");

            migrationBuilder.DropTable(
                name: "Shitjet_Produkteve");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Workshop",
                table: "Workshop");

            migrationBuilder.RenameTable(
                name: "Workshop",
                newName: "Workshops");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Workshops",
                table: "Workshops",
                column: "workshop_id");
        }
    }
}
