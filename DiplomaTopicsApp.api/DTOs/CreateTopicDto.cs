namespace DiplomaTopicsApp.api.DTOs;

public abstract class CreateTopicDto
{
    public string Title { get; set; }
    public string Degree { get; set; }
    public string? FieldOfStudy { get; set; }
    public string? Author { get; set; }
    public string? Description { get; set; }
}