using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Macrix.Contracts.Model;
namespace Macrix.Contracts
{
    public interface IUserService
    {
        public List<User> GetAll();
        public User GetById(Guid Id);
        public User Create(User newUser);
        public User Update(Guid id, User userModel);
        public bool Delete(Guid Id);
    }
}