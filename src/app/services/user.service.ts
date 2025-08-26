import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface UserDto {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor() {}

  // Mock API call
  getUsers(): Observable<UserDto[]> {
    console.log('UserService: fetching users');
    const mockUsers: UserDto[] = [
      { id: '1', name: 'Utilisateur 1' },
      { id: '2', name: 'Utilisateur 2' },
      { id: '3', name: 'Utilisateur 3' },
    ];

    // simulate réseau avec délai 500ms
    return of(mockUsers).pipe(delay(500)).pipe(tap(() => console.log('UserService: users returned', mockUsers)));
  }
}