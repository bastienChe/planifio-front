import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CustomerDto } from '../models/customerDto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _customers: CustomerDto[] = [
    {
      id: 'c1',
      firstName: 'Alice',
      lastName: 'Martin',
      gender: 'F',
      birthDate: '1990-05-12',
      email: 'alice.martin@example.com',
      phone: '0612345678',
      address: '12 rue de Paris, Lyon',
      optinNewsletter: true,
      optinSms: false,
    },
    {
      id: 'c2',
      firstName: 'Bob',
      lastName: 'Durand',
      gender: 'M',
      birthDate: '1985-03-22',
      email: 'bob.durand@example.com',
      phone: '0698765432',
      address: '34 avenue de la République, Marseille',
      optinNewsletter: false,
      optinSms: true,
    },
    {
      id: 'c3',
      firstName: 'Chloé',
      lastName: 'Bernard',
      gender: 'F',
      birthDate: '1992-11-08',
      email: 'chloe.bernard@example.com',
      phone: '0678452391',
      address: '56 boulevard Saint-Michel, Paris',
      optinNewsletter: true,
      optinSms: true,
    },
    {
      id: 'c4',
      firstName: 'David',
      lastName: 'Petit',
      gender: 'M',
      birthDate: '1978-02-14',
      email: 'david.petit@example.com',
      phone: '0625123498',
      address: '3 rue Victor Hugo, Bordeaux',
      optinNewsletter: false,
      optinSms: false,
    },
    {
      id: 'c5',
      firstName: 'Emma',
      lastName: 'Lefevre',
      gender: 'F',
      birthDate: '2000-07-01',
      email: 'emma.lefevre@example.com',
      phone: '0667458192',
      address: '27 avenue des Fleurs, Nice',
      optinNewsletter: true,
      optinSms: false,
    },
    {
      id: 'c6',
      firstName: 'François',
      lastName: 'Moreau',
      gender: 'M',
      birthDate: '1983-09-19',
      email: 'francois.moreau@example.com',
      phone: '0634895721',
      address: '78 chemin des Oliviers, Montpellier',
      optinNewsletter: false,
      optinSms: true,
    },
    {
      id: 'c7',
      firstName: 'Gaëlle',
      lastName: 'Roux',
      gender: 'F',
      birthDate: '1995-04-23',
      email: 'gaelle.roux@example.com',
      phone: '0698123475',
      address: '14 rue de la Gare, Nantes',
      optinNewsletter: true,
      optinSms: true,
    },
    {
      id: 'c8',
      firstName: 'Hugo',
      lastName: 'Dubois',
      gender: 'M',
      birthDate: '1989-12-30',
      email: 'hugo.dubois@example.com',
      phone: '0645871290',
      address: '99 rue des Lilas, Toulouse',
      optinNewsletter: false,
      optinSms: false,
    }
  ];

  // BehaviorSubject pour exposer la liste et simuler un backend réactif
  private _customers$ = new BehaviorSubject<CustomerDto[]>(this._customers);

  constructor() {}

  getAllCustomers(): Observable<CustomerDto[]> {
    return this._customers$.asObservable().pipe(delay(500)); // délai simulé
  }

  getCustomerById(id: string): Observable<CustomerDto | undefined> {
    return this.getAllCustomers().pipe(
      map(customers => customers.find(c => c.id === id))
    );
  }

  createCustomer(customer: CustomerDto): Observable<CustomerDto> {
    const newCustomer: CustomerDto = {
      ...customer,
      id: crypto.randomUUID() 
    };
    this._customers.push(newCustomer);
    this._customers$.next([...this._customers]);
    return of(newCustomer).pipe(delay(300));
  }

  updateCustomer(customer: CustomerDto): Observable<CustomerDto | null> {
    const index = this._customers.findIndex(c => c.id === customer.id);
    if (index > -1) {
      this._customers[index] = { ...customer };
      this._customers$.next([...this._customers]);
      return of(customer).pipe(delay(300));
    }
    return of(null);
  }

  deleteCustomer(id: string): Observable<boolean> {
    const index = this._customers.findIndex(c => c.id === id);
    if (index > -1) {
      this._customers.splice(index, 1);
      this._customers$.next([...this._customers]);
      return of(true).pipe(delay(300));
    }
    return of(false);
  }
}