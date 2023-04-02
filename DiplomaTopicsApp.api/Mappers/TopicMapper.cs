using DiplomaTopicsApp.api.DTOs;
using DiplomaTopicsApp.api.Models;

namespace DiplomaTopicsApp.api.Mappers;

public static class TopicMapper
{
    public static Topic DtoToModel(this CreateTopicDto createTopicDto)
    {
        return new Topic
        {
            Name = createTopicDto.Name,
            Description = createTopicDto.Description,
            Author = createTopicDto.Author
        };
    }
}