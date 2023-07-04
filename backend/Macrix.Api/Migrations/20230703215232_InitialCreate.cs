using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Macrix.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "USER",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "TEXT", nullable: false),
                    FIRST_NAME = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    LAST_NAME = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    STREET_NAME = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    HOUSE_NUMBER = table.Column<string>(type: "TEXT", maxLength: 16, nullable: false),
                    APARTMENT_NUMBER = table.Column<string>(type: "TEXT", maxLength: 16, nullable: true),
                    POSTAL_CODE = table.Column<string>(type: "TEXT", maxLength: 32, nullable: false),
                    DATE_OF_BIRTH = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    TOWN = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                    PHONE_NUMBER = table.Column<string>(type: "TEXT", maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USER", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "USER");
        }
    }
}
