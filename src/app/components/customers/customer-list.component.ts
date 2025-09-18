import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterCustomersPipe } from './filterCustomers.pipe';
import { FormsModule } from '@angular/forms';
import { CustomerDto } from '../../models/customerDto';

@Component({
  selector: 'customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {
  // Filtres
  filterText$ = new BehaviorSubject<string>('');
  filterGender$ = new BehaviorSubject<string>('');

  // Flux de clients filtrés
  customers$: Observable<CustomerDto[]>;

  constructor(private customerService: CustomerService) {
    const allCustomers$ = this.customerService.getAllCustomers();

    this.customers$ = combineLatest([allCustomers$, this.filterText$, this.filterGender$]).pipe(
      map(([customers, text, gender]) => {
        return customers.filter(c =>
          (!text || c.firstName.toLowerCase().includes(text.toLowerCase()) || c.lastName.toLowerCase().includes(text.toLowerCase()))
          && (!gender || c.gender === gender)
        );
      })
    );
  }

  ngOnInit(): void {
  }

  onTextChange(value: string) {
    this.filterText$.next(value);
  }

  onGenderChange(event: Event) {
    const value = (event.target as HTMLSelectElement)?.value ?? '';
    this.filterGender$.next(value);
  }

}