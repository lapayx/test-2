using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Macrix.Contracts;
using Macrix.DB;
using Macrix.Contracts.Model;

namespace Macrix.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDBContext _dbContext;
        public UserService(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<User> GetAll()
        {
            return _dbContext.Users.Select(x => new User()
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                StreetName = x.StreetName,
                ApartmentNumber = x.ApartmentNumber,
                DateOfBirth = x.DateOfBirth,
                HouseNumber = x.HouseNumber,
                PhoneNumber = x.PhoneNumber,
                PostalCode = x.PostalCode,
                Town = x.Town
            }).ToList<User>();
        }

        public User GetById(Guid id)
        {

            return _dbContext.Users.Select(x => new User()
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                StreetName = x.StreetName,
                ApartmentNumber = x.ApartmentNumber,
                DateOfBirth = x.DateOfBirth,
                HouseNumber = x.HouseNumber,
                PhoneNumber = x.PhoneNumber,
                PostalCode = x.PostalCode,
                Town = x.Town
            }).FirstOrDefault(x => x.Id == id);
        }

        public User Create(User newUser)
        {
            DB.Model.User newItem = new DB.Model.User()
            {
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                StreetName = newUser.StreetName,
                ApartmentNumber = newUser.ApartmentNumber,
                DateOfBirth = newUser.DateOfBirth,
                HouseNumber = newUser.HouseNumber,
                PhoneNumber = newUser.PhoneNumber,
                PostalCode = newUser.PostalCode,
                Town = newUser.Town

            };
            _dbContext.Users.Add(newItem);
            _dbContext.SaveChanges();
            return this.GetById(newItem.Id);
        }

        public User Update(Guid id, User userModel)
        {
            var item = _dbContext.Users.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                return null;
            }
            item.FirstName = userModel.FirstName;
            item.LastName = userModel.LastName;
            item.StreetName = userModel.StreetName;
            item.ApartmentNumber = userModel.ApartmentNumber;
            item.DateOfBirth = userModel.DateOfBirth;
            item.HouseNumber = userModel.HouseNumber;
            item.PhoneNumber = userModel.PhoneNumber;
            item.PostalCode = userModel.PostalCode;
            item.Town = userModel.Town;
            _dbContext.SaveChanges();

            return this.GetById(id);
        }

        public bool Delete(Guid id)
        {
            var item = _dbContext.Users.FirstOrDefault(x => x.Id == id);
            if (item != null)
            {
                _dbContext.Users.Remove(item);
                _dbContext.SaveChanges();
                return true;
            }
            return false;
        }
    }
}