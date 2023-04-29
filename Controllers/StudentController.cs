using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestRamsay.Data;
using TestRamsay.Entities;

namespace TestRamsay.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public StudentController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Student>>> GetAll()
        {
            // retrieve all students
            return await _applicationDbContext.Student.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Add([FromBody] Student student)
        {
            try
            {
                // Create record
                _applicationDbContext.Student.Add(student);
                await _applicationDbContext.SaveChangesAsync();
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        public async Task<ActionResult<bool>> Edit([FromBody] Student data)
        {
            // Check if student exists
            var student = await _applicationDbContext.Student.FindAsync(data.Id);

            if (student != null)
            {
                try
                {
                    // if exists update record
                    student.FirstName = data.FirstName;
                    student.LastName = data.LastName;
                    student.Age = data.Age;
                    student.Username = data.Username;
                    student.Career = data.Career;
                    student.Id = data.Id;
                    _applicationDbContext.Attach(student);
                    _applicationDbContext.SaveChanges();
                    return Ok();

                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            } else
            {
                // else return bad request
                return BadRequest();
            }


        }

        [HttpDelete("{studentId}")]
        public async Task<ActionResult<bool>> Delete(int studentId)
        {
            // Check if student exists
            var student = await _applicationDbContext.Student.FindAsync(studentId);

            if (student != null)
            {
                try
                {
                    // remove item if exists
                    _applicationDbContext.Entry(student).State = EntityState.Deleted;
                    _applicationDbContext.SaveChanges();
                    return Ok();

                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            else
            {
                // else return bad request
                return BadRequest();
            }


        }
    }
}
