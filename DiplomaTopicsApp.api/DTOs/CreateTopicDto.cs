using System;
using System.ComponentModel.DataAnnotations;

namespace DiplomaTopicsApp.api.DTOs;

public class CreateTopicDto
{
    [Required]
    public string Title { get; set; }
    [Required]
    public string Degree { get; set; }
    public string? FieldOfStudy { get; set; }
    public string? Author { get; set; }
    public string? Description { get; set; }
    public bool Status { get; set; } = true;
    [Required] 
    public DateTime CreatedAt { get; set; }
}