using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Macrix.DB.Model
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string StreetName { get; set; }
        public string HouseNumber { get; set; }
        public string ApartmentNumber { get; set; }
        public string PostalCode { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Town { get; set; }
        public string PhoneNumber { get; set; }




    }
}