using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Macrix.DB.Model;
using Microsoft.EntityFrameworkCore;

namespace Macrix.DB.Map
{
    public static partial class ApplicationDBContext
    {

        public static void UserMap(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(x =>
            {
                x.ToTable("USER");
                x.HasKey(t => t.Id);

                x.Property(t => t.Id).IsRequired().HasColumnName("ID")
                 .ValueGeneratedOnAdd();
                x.Property(t => t.FirstName).IsRequired()
                    .HasColumnName("FIRST_NAME")
                    .HasMaxLength(128);
                x.Property(t => t.LastName).IsRequired()
                    .HasColumnName("LAST_NAME")
                    .HasMaxLength(128);
                x.Property(t => t.StreetName).IsRequired()
                    .HasColumnName("STREET_NAME")
                    .HasMaxLength(128);
                x.Property(t => t.HouseNumber).IsRequired()
                    .HasColumnName("HOUSE_NUMBER")
                    .HasMaxLength(16);
                x.Property(t => t.ApartmentNumber).IsRequired(false)
                    .HasColumnName("APARTMENT_NUMBER")
                    .HasMaxLength(16);
                x.Property(t => t.PostalCode).IsRequired()
                    .HasColumnName("POSTAL_CODE")
                    .HasMaxLength(32);
                    x.Property(t => t.Town).IsRequired()
                    .HasColumnName("TOWN")
                    .HasMaxLength(64);
                    x.Property(t => t.PhoneNumber).IsRequired()
                    .HasColumnName("PHONE_NUMBER")
                    .HasMaxLength(32);
                x.Property(t => t.DateOfBirth)
                .IsRequired()
                .HasColumnName("DATE_OF_BIRTH");





            }
            );


        }
    }


}