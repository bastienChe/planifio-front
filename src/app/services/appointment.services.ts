import { Injectable } from '@angular/core';
import { AppointmentDto } from '../models/appointmentDto';
import { delay, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppointmentService {

private _appointments: AppointmentDto[];

  constructor() {
    this._appointments = [
      { id: 'a1', name: 'Coiffure', durationMinutes: 15 },
      { id: 'a2', name: 'Brushing', durationMinutes: 30 },
      { id: 'a3', name: 'Couleur', durationMinutes: 45 },
    ];
  }

  getAvaibleAppointments$(): Observable<AppointmentDto[]> {
    return of(this._appointments).pipe(
      delay(100)
    );
  }

}