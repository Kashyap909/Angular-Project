import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  imports: [RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit{

  employee!: Employee;

  constructor(
    private readonly employeeService : EmployeeService,
    private readonly router : Router,
    private readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {
    

    // snapshot - It is a static snapshot of the route state at component creating time
    // paraMap.get() - looks up the URL segment parameter named "id"
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeService.getById(id).subscribe( emp => this.employee = emp);
    
  }

  back() {
    this.router.navigate(["/employees"]);
  }

}
