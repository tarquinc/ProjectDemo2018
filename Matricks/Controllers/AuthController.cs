using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Matricks.Data;
using Matricks.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Matricks.Controllers
{
    [Produces("application/json")]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly IAuthRepository _repo;

        private readonly IConfiguration _key;

        public AuthController(IAuthRepository repo, IConfiguration key)
        {
            _repo = repo;
            _key = key;
        }

        //public IConfiguration(IConfiguration key)
        //{
        //    _key = key;
        //}

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO user) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Make user name lower case
            user.UserName = user.UserName.ToLower();
            
            // If duplicate user name and return bad request here
            // Need method in AuthRepo to test for this
            if (_repo.Duplicate(user.UserName) == true)
            {
                ModelState.AddModelError("UserName", "User name already exists.");
                return BadRequest(ModelState);

            }

            var newUser = await _repo.Register(user.UserName, user.Password);
            // Temporary return result for testing
            return StatusCode(201, new { ID = newUser.ID, UserName = newUser.UserName });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO user)
        {
            var storedUser = await _repo.Login(user.UserName, user.Password);
            if (storedUser == null)
            {
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_key.GetSection("TokenSettings:JWTKey").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, storedUser.ID.ToString()),
                    new Claim(ClaimTypes.Name, storedUser.UserName)
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // Temporary return value for testing
            return Ok(new { Token = tokenString, ID = storedUser.ID, UserName = storedUser.UserName });
        }
    }
}