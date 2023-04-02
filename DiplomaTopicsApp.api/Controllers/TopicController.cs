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

        // GET: api/Topic
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Topic>>> GetTopics()
        {
            if (_context.Topics == null)
            {
                return NotFound();
            }

            return await _context.Topics.ToListAsync();
        }

        // GET: api/Topic/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Topic>> GetTopic(int id)
        {
            if (_context.Topics == null)
            {
                return NotFound();
            }

            var topic = await _context.Topics.FindAsync(id);

            if (topic == null)
            {
                return NotFound();
            }

            return topic;
        }

        // PUT: api/Topic/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTopic(int id, Topic topic)
        {
            if (id != topic.Id)
            {
                return BadRequest();
            }

            _context.Entry(topic).State = EntityState.Modified;

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

        // POST: api/Topic
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Topic>> PostTopic(Topic topic)
        {
            if (_context.Topics == null)
            {
                return Problem("Entity set 'DiplomaTopicsDbContext.Topics'  is null.");
            }

            _context.Topics.Add(topic);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTopic", new { id = topic.Id }, topic);
        }

        // DELETE: api/Topic/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTopic(int id)
        {
            if (_context.Topics == null)
            {
                return NotFound();
            }

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
            return (_context.Topics?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}