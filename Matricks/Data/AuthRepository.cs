using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Matricks.Models;

namespace Matricks.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public Task<User> Login(string userName, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<User> Register(string user, string password)
        {
            // password hash and salt
          //  byte[] passwordHash, passwordSalt;

            var hash = new HMACSHA512();
            var computedHash = hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            var newUser = new User { UserName = user };

            newUser.PasswordHash = computedHash;
            newUser.PasswordSalt = hash.Key;

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return newUser;
        }
    }
}
