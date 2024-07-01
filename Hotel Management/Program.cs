using Hotel_Management.Interface;
using Hotel_Management.Model;
using Hotel_Management.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Configuration.GetSection("ConnectionStrings").Bind(AppSettings.ConnnectionString);
builder.Services.AddScoped<IGuestRepository, GuestRepository>();
builder.Services.AddScoped<IFeedbackRepository,FeedbackRepository>();
builder.Services.AddScoped<IReservationRepository,ReservationRepository>();
builder.Services.AddScoped<IRevenueRepository, RevenueRepository>();
builder.Services.AddScoped<ISecurityLogRepository, SecurityLogRepository>();
builder.Services.AddScoped<IRoomRateRepository,RoomRateRepository>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173")
                          // Update with your frontend origin
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});


var app = builder.Build();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("ApiCorsPolicy");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
