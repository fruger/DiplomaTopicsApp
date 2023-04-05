using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DiplomaTopicsApp.api.Migrations
{
    /// <inheritdoc />
    public partial class AddedDegreeAndFieldOfStudyProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Topics",
                newName: "Title");

            migrationBuilder.AddColumn<string>(
                name: "Degree",
                table: "Topics",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FieldOfStudy",
                table: "Topics",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Degree",
                table: "Topics");

            migrationBuilder.DropColumn(
                name: "FieldOfStudy",
                table: "Topics");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Topics",
                newName: "Name");
        }
    }
}
