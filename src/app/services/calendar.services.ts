// calendar.service.ts
import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable, BehaviorSubject } from 'rxjs';
import { getRandomColor } from '../shared/event-color';

@Injectable({ providedIn: 'root' })
export class CalendarService {  

  private events$ = new Map<string, BehaviorSubject<CalendarEvent[]>>();

  constructor() {
    this.events$.set(
      '1',
      new BehaviorSubject<CalendarEvent[]>([
        {
          start: new Date(new Date().setHours(8, 30, 0, 0)),
          end: new Date(new Date().setHours(9, 0, 0, 0)),
          title: 'RDV Tom',
          color: getRandomColor(),
          draggable: true,
          resizable: { beforeStart: true, afterEnd: true },
        },
      ])
    );

    this.events$.set(
      '2',
      new BehaviorSubject<CalendarEvent[]>([
        {
          start: new Date(new Date().setHours(10, 0, 0, 0)),
          end: new Date(new Date().setHours(10, 30, 0, 0)),
          title: 'RDV Mr X',
          color: getRandomColor(),
          draggable: true,
          resizable: { beforeStart: true, afterEnd: true },
        },
      ])
    );

    this.events$.set(
      '3',
      new BehaviorSubject<CalendarEvent[]>([
        {
          start: new Date(new Date().setHours(14, 0, 0, 0)),
          end: new Date(new Date().setHours(15, 0, 0, 0)),
          title: 'RDV client',
          color: getRandomColor(),
          draggable: true,
          resizable: { beforeStart: true, afterEnd: true },
        },
      ])
    );
  }

  getEmployeeEvents$(employeeId: string): Observable<CalendarEvent[]> {
  console.log("CalendarService: fetching events for employee", employeeId);
    return this.events$.get(employeeId)?.asObservable() || 
      new BehaviorSubject<CalendarEvent[]>([]).asObservable();
  }

  addEvent(employeeId: string, event: CalendarEvent) {
    const subject = this.events$.get(employeeId);
    if (subject) {
      subject.next([...subject.value, event]);
    }
  }

  updateEvent(employeeId: string, updated: CalendarEvent) {
    const subject = this.events$.get(employeeId);
    if (subject) {
      subject.next(subject.value.map(e => e === updated ? updated : e));
    }
  }

  deleteEvent(employeeId: string, event: CalendarEvent) {
    const subject = this.events$.get(employeeId);
    if (subject) {
      subject.next(subject.value.filter(e => e !== event));
    }
  }
}