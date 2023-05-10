using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DiplomaTopicsApp.api.Models;

public class Topic
{
    public int Id { get; set; }
    [MinLength(5),MaxLength(200)]
    public string Title { get; set; }
    public string Degree { get; set; }
    [MaxLength(50)]
    public string? FieldOfStudy { get; set; }
    [MaxLength(50)]
    public string? Author { get; set; }
    [MaxLength(500)]
    public string? Description { get; set; }
    [DefaultValue(true)]
    public bool Status { get; set; }
    public DateTime CreatedAt { get; set; }
}