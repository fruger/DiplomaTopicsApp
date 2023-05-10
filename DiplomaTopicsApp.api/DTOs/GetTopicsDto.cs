namespace DiplomaTopicsApp.api.DTOs;

public class GetTopicsDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Degree { get; set; }
    public string? FieldOfStudy { get; set; }
    public string? Author { get; set; }
    public bool Status { get; set; }
}