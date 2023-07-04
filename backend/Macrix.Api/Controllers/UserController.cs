using Microsoft.AspNetCore.Mvc;
using Macrix.Contracts;
using Macrix.Contracts.Model;
using Macrix.Api.ViewModels;

namespace Macrix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{


    private readonly ILogger<UserController> _logger;
    private readonly IUserService _userService;
    public UserController(ILogger<UserController> logger, IUserService userService)
    {
        _logger = logger;
        _userService = userService;
    }

    [HttpGet]
    public ActionResult<IList<User>> Get()
    {
        return _userService.GetAll();
    }

    [HttpPost]
    public ActionResult<User> Post([FromBody] UserViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }
        User newItem = new User()
        {
            FirstName = model.FirstName,
            LastName = model.LastName,
            StreetName = model.StreetName,
            ApartmentNumber = model.ApartmentNumber,
            DateOfBirth = new DateOnly(model.DateOfBirth.Year, model.DateOfBirth.Month, model.DateOfBirth.Day),
            HouseNumber = model.HouseNumber,
            PhoneNumber = model.PhoneNumber,
            PostalCode = model.PostalCode,
            Town = model.Town
        };

        return _userService.Create(newItem);
    }

    [HttpPut("{id}")]
    public ActionResult<User> Put(Guid id, [FromBody] UserViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        User item = new User()
        {
            FirstName = model.FirstName,
            LastName = model.LastName,
            StreetName = model.StreetName,
            ApartmentNumber = model.ApartmentNumber,
            DateOfBirth = new DateOnly(model.DateOfBirth.Year, model.DateOfBirth.Month, model.DateOfBirth.Day),
            HouseNumber = model.HouseNumber,
            PhoneNumber = model.PhoneNumber,
            PostalCode = model.PostalCode,
            Town = model.Town
        };

        return _userService.Update(id, item);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        bool result = _userService.Delete(id);
        if (result)
        {
            return NoContent();
        }
        else
        {
            return BadRequest();
        }

    }

    [HttpPost("batchChnage")]
    public ActionResult<User> BatchChnage([FromBody] List<BatchEditUserViewModel> model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }
        foreach (var m in model)
        {
            if (!m.IsChnaged)
            {
                continue;
            }

            if (m.Id.HasValue && m.IsRemoved)
            {
                _userService.Delete(m.Id.Value);
                continue;

            };
            User newItem = new User()
            {
                FirstName = m.FirstName,
                LastName = m.LastName,
                StreetName = m.StreetName,
                ApartmentNumber = m.ApartmentNumber,
                DateOfBirth = new DateOnly(m.DateOfBirth.Year, m.DateOfBirth.Month, m.DateOfBirth.Day),
                HouseNumber = m.HouseNumber,
                PhoneNumber = m.PhoneNumber,
                PostalCode = m.PostalCode,
                Town = m.Town
            };
            if (m.Id.HasValue && m.Id != Guid.Empty)
            {
                _userService.Update(m.Id.Value, newItem);
            }
            else
            {
                _userService.Create(newItem);
            }
            continue;
        }


        return NoContent();
    }
}
