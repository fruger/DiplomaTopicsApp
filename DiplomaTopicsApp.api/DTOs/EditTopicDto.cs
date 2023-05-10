using System.ComponentModel.DataAnnotations;

namespace DiplomaTopicsApp.api.DTOs;

public class EditTopicDto
{
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Degree { get; set; }
    public string? FieldOfStudy { get; set; }
    public string? Author { get; set; }
    public string? Description { get; set; }
    public bool Status { get; set; }
}