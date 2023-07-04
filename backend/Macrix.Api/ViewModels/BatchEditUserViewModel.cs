using System.ComponentModel.DataAnnotations;

namespace Macrix.Api.ViewModels
{
    public class BatchEditUserViewModel
    {
        public Guid? Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string StreetName { get; set; }
        [Required]
        public string HouseNumber { get; set; }
        public string ApartmentNumber { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string Town { get; set; }
        [Required]
        public string PhoneNumber { get; set; }

        public bool IsChnaged { get; set; }
        public bool IsRemoved { get; set; }
    }
}