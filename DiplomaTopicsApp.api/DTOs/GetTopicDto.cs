namespace DiplomaTopicsApp.api.DTOs;

public class GetTopicDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Degree { get; set; }
    public string? FieldOfStudy { get; set; }
    public string? Author { get; set; }
    public string? Description { get; set; }
    public bool Status { get; set; }
    public DateTime CreatedAt { get; set; }
}