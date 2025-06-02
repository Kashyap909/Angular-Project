import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})

export class EmployeeListComponent implements OnInit{

  employees: Employee[] = [];

  constructor(    
    private readonly employeeService: EmployeeService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {

    //Its a RxJS subscribe to listen to data coming from an observable.
    this.employeeService.getAll().subscribe(list => this.employees = list);
  }

  edit(id: number){
    this.router.navigate(['/employees/edit', id]);
  }

  details(id: number){
    this.router.navigate(['/employees/detail', id]);
  }

  delete(id?: number){
    this.employeeService.delete(id!).subscribe(() => this.load());
  }

}
