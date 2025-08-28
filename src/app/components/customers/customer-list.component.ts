import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CustomerDto } from '../../models/customerDto';
import { CustomerService } from '../../services/customer.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FilterCustomersPipe } from './filterCustomers.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FilterCustomersPipe, FormsModule],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
  providers: [CustomerService]
})
export class CustomerListComponent  {

  filterText = '';
  filterGender = '';
  customers$: Observable<CustomerDto[]>;

  constructor(private customerService: CustomerService) {
      this.customers$ = this.customerService.getAllCustomers();
  }

  ngOnInit(): void {
    this.customers$ = this.customerService.getAllCustomers();
  }

}