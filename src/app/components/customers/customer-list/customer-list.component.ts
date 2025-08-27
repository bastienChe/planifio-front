import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CustomerDto } from '../../../models/customerDto';
import { CustomerService } from '../../../services/customers.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-list.html',
  providers: [CustomerService]
})
export class CustomerListComponent  {


    customers$: Observable<CustomerDto[]>;

    constructor(private customerService: CustomerService) {
        this.customers$ = this.customerService.getAllCustomers();
    }


}