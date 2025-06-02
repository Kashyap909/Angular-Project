import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private readonly URL = "http://localhost:5220/api/Employee";

  constructor (private readonly http: HttpClient) {}

  // It is used for handling asynchronous operations such as HTTP request
  getAll(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.URL);
  }

  getById(id:number): Observable<Employee>{
    return this.http.get<Employee>(`${this.URL}/${id}`);
  }

  add(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(this.URL, employee);
  }

  update(employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.URL}/${employee.id}`, employee);
  }

  delete(id: number): Observable<Employee>{
    return this.http.delete<Employee>(`${this.URL}/${id}`);
  }

}
