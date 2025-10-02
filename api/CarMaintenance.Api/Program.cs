using CarMaintenance.Api.Data;
using CarMaintenance.Api.Enterprise;
using CarMaintenance.Api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

// Add CORS services with updated origins for production
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder => 
        builder
            .WithOrigins(
                "http://localhost:5173", 
                "http://localhost:5191",
                "https://gitgarage.com",
                "https://www.gitgarage.com"
            ) 
            .AllowAnyMethod()
            .AllowAnyHeader()
    );
});

// Add services to the container.
builder.Services.AddControllers();

// Only add Swagger in development environment
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}

// Dependency Injection for EntityDbContext and ECs
builder.Services.AddDbContext<EntityDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register AuthService
builder.Services.AddScoped<IAuthService, AuthenticationService>();

// Register Enterprise Components
builder.Services.AddScoped<UserEc>();
builder.Services.AddScoped<CarEc>();
builder.Services.AddScoped<MaintenanceItemEc>();

// Configure JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"] ?? 
                                       throw new InvalidOperationException("JWT key is not configured"))),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // In production, use HTTPS redirection and enable security headers
    app.UseHttpsRedirection();
    
    // Add HSTS middleware for enhanced security in production
    app.UseHsts(); // HTTP Strict Transport Security
}

// Add CORS middleware
app.UseCors("AllowReactApp");

// Add authentication middleware
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();