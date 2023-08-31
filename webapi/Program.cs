using Microsoft.EntityFrameworkCore;
using webapi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddCors();

builder.Services.AddDbContext<AppDB_Context>(options =>
{
    var builder = new ConfigurationBuilder();    
    builder.SetBasePath(Directory.GetCurrentDirectory());    
    builder.AddJsonFile("appsettings.json");    
    var config = builder.Build();    
    string connectionString = config.GetConnectionString("DefaultConnection");

    options.UseSqlServer(connectionString);
});


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


//app.UseCors(builder => builder.AllowAnyOrigin());


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
