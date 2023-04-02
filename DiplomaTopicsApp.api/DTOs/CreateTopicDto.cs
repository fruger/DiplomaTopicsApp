namespace DiplomaTopicsApp.api.DTOs;

public abstract class CreateTopicDto
{
    public string Name { get; }
    public string? Description { get; }
    public string? Author { get; }
    
    public CreateTopicDto(string name, string? description, string? author)
    {
        Name = name;
        Description = description;
        Author = author;
    }
}