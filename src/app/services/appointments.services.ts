import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';
import { delay, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppointmentService {

private _appointments: Appointment[];

  constructor() {
    this._appointments = [
      { id: 'a1', name: 'Coiffure', durationMinutes: 15 },
      { id: 'a2', name: 'Brushing', durationMinutes: 30 },
      { id: 'a3', name: 'Couleur', durationMinutes: 45 },
    ];
  }

  getAvaibleAppointments$(): Observable<Appointment[]> {
    return of(this._appointments).pipe(
      delay(100)
    );
  }

}