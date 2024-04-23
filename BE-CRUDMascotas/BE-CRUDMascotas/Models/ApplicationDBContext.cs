using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Models
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {

        }

        public DbSet<Mascota> Mascotas { get; set; }
    }
}
