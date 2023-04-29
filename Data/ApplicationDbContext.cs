using Microsoft.EntityFrameworkCore;
using TestRamsay.Entities;

namespace TestRamsay.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }


        public DbSet<Student> Student { get; set; }
    }
}
