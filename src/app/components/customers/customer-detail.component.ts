import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { CustomerDto } from '../../models/customerDto';

@Component({
  selector: 'customer-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customer-detail.html'
})
export class CustomerDetailComponent implements OnInit {
  customer$!: Observable<CustomerDto | undefined>;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customer$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return this.customerService.getCustomerById(id);
      })
    );
  }
}
