import { Injectable } from '@angular/core';
import { CustomerDto } from '../models/customerDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:8081/planifio';

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(`${this.baseUrl}/customers`);
  }

  getCustomerById(id: string): Observable<CustomerDto> {
    return this.http.get<CustomerDto>(`${this.baseUrl}/customer/${id}`);
  }

  createCustomer(customer: CustomerDto): Observable<CustomerDto> {
    return this.http.post<CustomerDto>(`${this.baseUrl}/customer/`, customer);
  }

  updateCustomer(customer: CustomerDto): Observable<CustomerDto> {
    return this.http.put<CustomerDto>(`${this.baseUrl}/customer/${customer.id}`, customer);
  }

  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/customer/${id}`);
  }
}