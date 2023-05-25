using System;
using DiplomaTopicsApp.api.DTOs;
using DiplomaTopicsApp.api.Models;

namespace DiplomaTopicsApp.api.Mappers;

public static class TopicMapper
{
    public static GetTopicsDto ModelToGetTopicsDto (this Topic topic)
    {
        return new GetTopicsDto
        {
            Id = topic.Id,
            Title = topic.Title,
            Degree = topic.Degree,
            FieldOfStudy = topic.FieldOfStudy,
            Author = topic.Author,
            Status = topic.Status,
        };
    }
    
    public static GetTopicDto ModelToGetTopicDto (this Topic topic)
    {
        return new GetTopicDto
        {
            Id = topic.Id,
            Title = topic.Title,
            Degree = topic.Degree,
            FieldOfStudy = topic.FieldOfStudy,
            Author = topic.Author,
            Description = topic.Description,
            Status = topic.Status,
            CreatedAt = topic.CreatedAt
        };
    }
    
    public static Topic DtoToModel(this CreateTopicDto createTopicDto)
    {
        return new Topic
        {
            Title = createTopicDto.Title,
            Degree = createTopicDto.Degree,
            FieldOfStudy = createTopicDto.FieldOfStudy,
            Author = createTopicDto.Author,
            Description = createTopicDto.Description,
            Status = createTopicDto.Status,
            CreatedAt = DateTime.Now.Date
        };
    }
    
    public static Topic DtoToModel(this EditTopicDto editTopicDto)
    {
        return new Topic
        {
            Title = editTopicDto.Title,
            Degree = editTopicDto.Degree,
            FieldOfStudy = editTopicDto.FieldOfStudy,
            Author = editTopicDto.Author,
            Description = editTopicDto.Description,
            Status = editTopicDto.Status,
        };
    }
}