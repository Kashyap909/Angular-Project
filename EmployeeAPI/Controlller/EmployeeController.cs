using Microsoft.AspNetCore.Mvc;
using EmployeeApi.Data;
using EmployeeApi.Models;

namespace EmployeeApi.Controllers
{
  // Controller that handles HTTP requests related to Employee operations
  [ApiController]
  [Route("api/[controller]")]
  public class EmployeeController : ControllerBase
  {
    private readonly IEmployeeRepository _repository;

    public EmployeeController(IEmployeeRepository repository)
    {
      _repository = repository; // Inject the in-memory employee repository
    }

    [HttpGet]
    public ActionResult<IEnumerable<Employee>> GetAll()
    {
      // Get list of all employees
      return Ok(_repository.GetAllEmployees());
    }

    [HttpGet("{id}")]
    public ActionResult<Employee> GetById(int id)
    {
      // Get employee by ID
      var employee = _repository.GetById(id);
      return employee == null ? NotFound() : Ok(employee);
    }

    [HttpPost]
    public ActionResult<Employee> Create(Employee employee)
    {
      // Add a new employee
      var created = _repository.Add(employee);
      return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public ActionResult<Employee> Update(int id, Employee updated)
    {
      // Update existing employee
      var existing = _repository.Update(id, updated);
      return existing == null ? NotFound() : Ok(existing);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      // Delete employee by ID
      return _repository.Delete(id) ? NoContent() : NotFound();
    }
  }

}