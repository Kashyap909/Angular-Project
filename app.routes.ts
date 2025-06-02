import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

export const routes: Routes = [
  {path: '', redirectTo:'employees', pathMatch:'full'},
  {path:'employees', component: EmployeeListComponent},
  {path:'employees/add', component: EmployeeFormComponent},
  {path:'employees/edit/:id', component: EmployeeFormComponent},
  {path:'employees/detail/:id', component: EmployeeDetailComponent}
];
