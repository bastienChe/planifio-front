import { Pipe, PipeTransform } from '@angular/core';
import { CustomerDto } from '../../models/customerDto';

@Pipe({
  name: 'filterCustomers'
})
export class FilterCustomersPipe implements PipeTransform {
  transform(customers: CustomerDto[] | null, searchText: string, gender: string): CustomerDto[] {
    if (!customers) return [];
    return customers.filter(c => {
      const matchesText = !searchText || 
        c.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        c.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
        c.email.toLowerCase().includes(searchText.toLowerCase());
      const matchesGender = !gender || c.gender === gender;
      return matchesText && matchesGender;
    });
  }
}
