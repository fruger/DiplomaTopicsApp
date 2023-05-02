using System.ComponentModel.DataAnnotations;

namespace DiplomaTopicsApp.api.DTOs;

public class CreateTopicDto
{
    [Required]
    [MinLength(5),MaxLength(200)]
    public string Title { get; set; }
    [Required]
    public string Degree { get; set; }   
    [MaxLength(50)]
    public string? FieldOfStudy { get; set; }
    [MaxLength(50)]
    public string? Author { get; set; }
    [MaxLength(500)]
    public string? Description { get; set; }
}