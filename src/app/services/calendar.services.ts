// calendar.service.ts
import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable, BehaviorSubject } from 'rxjs';
import { getRandomColor } from '../shared/event-color';
import { v4 as uuidv4 } from 'uuid'; // besoin de npm install uuid

export interface EmployeeCalendarEvent extends CalendarEvent {
  id: string;        // identifiant unique de l'event
  employeeId: string; // à quel employé est rattaché l'event
}

@Injectable({ providedIn: 'root' })
export class CalendarService {  

  private _events$ = new BehaviorSubject<EmployeeCalendarEvent[]>([]);

  constructor() {
    // Données mockées
    const initial: EmployeeCalendarEvent[] = [
      {
        id: uuidv4(),
        employeeId: '1',
        start: new Date(new Date().setHours(15, 30, 0, 0)),
        end: new Date(new Date().setHours(16, 30, 0, 0)),
        title: 'RDV D',
        color: getRandomColor(),
      },
      {
        id: uuidv4(),
        employeeId: '2',
        start: new Date(new Date().setHours(10, 30, 0, 0)),
        end: new Date(new Date().setHours(11, 0, 0, 0)),
        title: 'RDV XX',
        color: getRandomColor(),
      },
      {
        id: uuidv4(),
        employeeId: '3',
        start: new Date(new Date().setHours(8, 30, 0, 0)),
        end: new Date(new Date().setHours(9, 0, 0, 0)),
        title: 'RDV Tom',
        color: getRandomColor(),
      }
    ];

    this._events$.next(initial);
  }

  /** Tous les events (debug, admin, etc.) */
  getAllEvents$(): Observable<EmployeeCalendarEvent[]> {
    return this._events$.asObservable();
  }

  /** Events d’un employé */
  getEmployeeEvents$(employeeId: string): Observable<EmployeeCalendarEvent[]> {
    return new Observable<EmployeeCalendarEvent[]>(observer => {
      this._events$.subscribe(events => {
        observer.next(events.filter(e => e.employeeId === employeeId));
      });
    });
  }

  /** Ajout */
  addEvent(employeeId: string, event: Omit<EmployeeCalendarEvent, 'id' | 'employeeId'>) {
    const newEvent: EmployeeCalendarEvent = { ...event, id: uuidv4(), employeeId };
    this._events$.next([...this._events$.value, newEvent]);
  }

  /** Mise à jour */
  updateEvent(updated: EmployeeCalendarEvent) {
    this._events$.next(
      this._events$.value.map(e => e.id === updated.id ? { ...updated } : e)
    );
  }

  /** Suppression */
  deleteEvent(eventId: string) {
    this._events$.next(this._events$.value.filter(e => e.id !== eventId));
  }
}