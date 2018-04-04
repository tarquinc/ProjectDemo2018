using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MyMatrix.API.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [Authorize]
        [HttpGet]
        public IActionResult GetValues()
        {
            var values = new string[] { "abc", "def", "ghi", "jkl" };
            return Ok(values);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult GetValue(int id)
        {
            // throw new Exception("Test exception");
            var value = "sample";
            return Ok(value);
        }

    }
}
