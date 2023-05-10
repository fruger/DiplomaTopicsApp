using DiplomaTopicsApp.api.DTOs;
using DiplomaTopicsApp.api.Mappers;
using DiplomaTopicsApp.api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiplomaTopicsApp.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly DiplomaTopicsDbContext _context;

        public TopicController(DiplomaTopicsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetTopicsDto>>> GetTopics()
        {
            var topics = await _context.Topics.ToListAsync();

            return topics.Select(x => x.ModelToGetTopicsDto()).ToArray();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<GetTopicDto>> GetTopic(int id)
        {
            var topic = await _context.Topics.Where(t => t.Id == id).FirstOrDefaultAsync();
            
            if (topic == null)
            {
                return NotFound();
            }

            return topic.ModelToGetTopicDto();
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutTopic(int id, [FromBody] EditTopicDto editTopicDto)
        {
            if (id != editTopicDto.Id)
            {
                return BadRequest();
            }

            var topicToUpdate = await _context.Topics.FindAsync(id);

            if (topicToUpdate == null)
            {
                return NotFound();
            }

            var updatedTopic = editTopicDto.DtoToModel();
            updatedTopic.Id = id;

            _context.Entry(topicToUpdate).CurrentValues.SetValues(updatedTopic);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TopicExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Topic>> CreateTopic(CreateTopicDto createTopicDto)
        {
            createTopicDto.CreatedAt = DateTime.Now;
            
            var topic = createTopicDto.DtoToModel();

            await _context.Topics.AddAsync(topic);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTopic", new { id = topic.Id }, topic);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteTopic(int id)
        {
            var topic = await _context.Topics.FindAsync(id);
            if (topic == null)
            {
                return NotFound();
            }

            _context.Topics.Remove(topic);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        private bool TopicExists(int id)
        {
            return _context.Topics.Any(e => e.Id == id);
        }
    }
}