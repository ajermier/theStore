using Microsoft.EntityFrameworkCore;

namespace theStore.Models
{
    public class TheStoreContext: DbContext
    {
        public TheStoreContext(DbContextOptions<TheStoreContext> options) : base(options)
        {

        }

        public DbSet<Product> Product { get; set; }
    }
}
