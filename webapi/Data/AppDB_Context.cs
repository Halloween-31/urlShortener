using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Data
{
    public class AppDB_Context : DbContext
    {
        public DbSet<ShortUrlInfo> ShortUrlInfos { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public AppDB_Context(DbContextOptions<AppDB_Context> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=ShortUrls;Trusted_Connection=True;");
            base.OnConfiguring(optionsBuilder);
        }       
    }
}