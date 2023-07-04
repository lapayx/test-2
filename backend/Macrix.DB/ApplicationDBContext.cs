using Microsoft.EntityFrameworkCore;
using  Macrix.DB.Model;
using  Macrix.DB.Map;
namespace Macrix.DB;
 public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
         : base(options)
        {

        }


        public DbSet<User> Users { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.UserMap();


        }
    }
