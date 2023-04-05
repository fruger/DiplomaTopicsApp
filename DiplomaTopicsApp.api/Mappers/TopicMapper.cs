using DiplomaTopicsApp.api.DTOs;
using DiplomaTopicsApp.api.Models;

namespace DiplomaTopicsApp.api.Mappers;

public static class TopicMapper
{
    public static Topic DtoToModel(this CreateTopicDto createTopicDto)
    {
        return new Topic
        {
            Title = createTopicDto.Title,
            Degree = createTopicDto.Degree,
            FieldOfStudy = createTopicDto.FieldOfStudy,
            Author = createTopicDto.Author,
            Description = createTopicDto.Description,
        };
    }
}