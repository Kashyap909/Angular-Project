import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})

export class EmployeeFormComponent implements OnInit{

  employeeForm!: FormGroup;
  check = false;
  empId: number | undefined;

  constructor(
    private readonly form: FormBuilder,
    private readonly employeeService: EmployeeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {


    this.employeeForm = this.form.group({
      firstName: ['', Validators.required],
      lastName: [ '', Validators.required],
      street:    ['', Validators.required],
      city:      ['', Validators.required],
      state:     ['', Validators.required],
      zipCode:   ['', Validators.required],
      aliases: this.form.array([])
    });

    // For edit
    const temp = this.route.snapshot.paramMap.get('id');

    if(temp) {

      this.check = true;
      this.empId = Number(temp);

      this.employeeService.getById(this.empId).subscribe( employee  =>
        {
          // patchValue - Updates the form model
          this.employeeForm.patchValue({
            firstName:employee.firstName,
            lastName: employee.lastName,
            street: employee.street,
            city: employee.city,
            state: employee.state,
            zipCode: employee.zipCode
          });

          employee.aliases.forEach( a => 
            this.aliases.push(this.form.control(a))
          );

        });
    }
  }

  get aliases(): FormArray {
    return this.employeeForm.get('aliases') as FormArray;
  }

  addAlias(): void {
    this.aliases.push(this.form.control('', Validators.required));
  }
  
  removeAlias(index: number): void {
    this.aliases.removeAt(index);
  }  

  submit(){

    const temp = this.employeeForm.value as Employee;

    if(this.check && this.empId != null){

      const updated: Employee = {
        id:      this.empId,
        ...this.employeeForm.value
      };

      this.employeeService.update(updated).subscribe(() => this.router.navigate(['/employees']));
    } else {
      this.employeeService.add(temp).subscribe(() => this.router.navigate(['/employees']));
    }
  }

}
