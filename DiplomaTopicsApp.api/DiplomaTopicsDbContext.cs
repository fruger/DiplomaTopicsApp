using DiplomaTopicsApp.api.Models;
using Microsoft.EntityFrameworkCore;

namespace DiplomaTopicsApp.api;

public class DiplomaTopicsDbContext : DbContext
{
    public DiplomaTopicsDbContext(DbContextOptions options): base(options)
    {

    }
    
    public DbSet<Topic> Topics { get; set; }
}