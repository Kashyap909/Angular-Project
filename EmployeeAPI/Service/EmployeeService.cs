using EmployeeApi.Models;

namespace EmployeeApi.Data
{
  // Interface for Employee repository
  public interface IEmployeeRepository
  {
    IEnumerable<Employee> GetAllEmployees();
    Employee? GetById(int id);
    Employee Add(Employee emp);
    Employee? Update(int id, Employee emp);
    bool Delete(int id);
  }

  public class InMemoryEmployeeRepository : IEmployeeRepository
  {
    // Static in-memory employee list
    private static List<Employee> _employees = new()
    {
        new Employee
        {
            Id = 1,
            FirstName = "Sam",
            LastName = "Bathani",
            Street = "123 Main St",
            City = "Dallas",
            State = "TX",
            ZipCode = "12345",
            Aliases = new List<string> { "Kashyap", "Kanu" }
        }
    };

    public IEnumerable<Employee> GetAllEmployees() => _employees;

    public Employee? GetById(int id) => _employees.FirstOrDefault(e => e.Id == id);

    public Employee Add(Employee emp)
    {
      // Auto-generate ID and add employee
      emp.Id = _employees.Any() ? _employees.Max(e => e.Id) + 1 : 1;
      _employees.Add(emp);
      return emp;
    }

    public Employee? Update(int id, Employee emp)
    {
      // Update employee by ID
      var existing = _employees.FirstOrDefault(e => e.Id == id);
      if (existing == null) return null;

      existing.FirstName = emp.FirstName;
      existing.LastName = emp.LastName;
      existing.Street = emp.Street;
      existing.City = emp.City;
      existing.State = emp.State;
      existing.ZipCode = emp.ZipCode;
      existing.Aliases = emp.Aliases;

      return existing;
    }

    public bool Delete(int id)
    {
      // Delete employee by ID
      var emp = _employees.FirstOrDefault(e => e.Id == id);
      if (emp == null) return false;
      _employees.Remove(emp);
      return true;
    }
  }

}
