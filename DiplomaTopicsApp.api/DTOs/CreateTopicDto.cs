namespace DiplomaTopicsApp.api.DTOs;

public abstract class CreateTopicDto
{
    public string Title { get; }
    public string Degree { get; }
    public string? FieldOfStudy { get; }
    public string? Author { get; }
    public string? Description { get; }
    
    public CreateTopicDto(string title, string? description, string? author, string degree, string? fieldOfStudy)
    {
        Title = title;
        Author = author;
        Degree = degree;
        FieldOfStudy = fieldOfStudy;
        Description = description;
    }
}