// calendar.service.ts
import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getRandomColor } from '../shared/event-color';

@Injectable({ providedIn: 'root' })
export class CalendarService {  

  private events$ = new Map<string, BehaviorSubject<CalendarEvent[]>>();

  constructor(private http: HttpClient) {
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

  getUserEvents$(userId: string): Observable<CalendarEvent[]> {
  console.log("CalendarService: fetching events for user", userId);
    return this.events$.get(userId)?.asObservable() || 
      new BehaviorSubject<CalendarEvent[]>([]).asObservable();
  }

  addEvent(userId: string, event: CalendarEvent) {
    const subject = this.events$.get(userId);
    if (subject) {
      subject.next([...subject.value, event]);
    }
  }

  updateEvent(userId: string, updated: CalendarEvent) {
    const subject = this.events$.get(userId);
    if (subject) {
      subject.next(subject.value.map(e => e === updated ? updated : e));
    }
  }

  deleteEvent(userId: string, event: CalendarEvent) {
    const subject = this.events$.get(userId);
    if (subject) {
      subject.next(subject.value.filter(e => e !== event));
    }
  }
}