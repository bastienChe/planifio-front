import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface EmployeeDto {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor() {}

  // Mock API call
  getEmployees(): Observable<EmployeeDto[]> {
    const mockUsers: EmployeeDto[] = [
      { id: '1', name: 'Utilisateur 1' },
      { id: '2', name: 'Utilisateur 2' },
      { id: '3', name: 'Utilisateur 3' },
    ];

    // simulate réseau avec délai 500ms
    return of(mockUsers).pipe(delay(500));
  }
}