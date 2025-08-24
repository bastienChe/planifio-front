// calendar.service.ts
import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CalendarService {  
    
    private _events = new BehaviorSubject<CalendarEvent[]>
    ([ 
        {
        start: new Date(new Date().setHours(8, 30, 0, 0)),
        end: new Date(new Date().setHours(9, 0, 0, 0)),
        title: 'RDV Tom',
        draggable: true,
        resizable: { beforeStart: true, afterEnd: true },
        },
        {
        start: new Date(new Date().setHours(9, 30, 0, 0)),
        end: new Date(new Date().setHours(10, 0, 0, 0)),
        title: 'RDV Orlando',
        draggable: true,
        resizable: { beforeStart: true, afterEnd: true },
        },
    ]);

  events$: Observable<CalendarEvent[]> = this._events.asObservable();

  addEvent(event: CalendarEvent) {
    this._events.next([...this._events.value, event]);
  }

  updateEvent(updated: CalendarEvent) {
    this._events.next(
      this._events.value.map(e => e === updated ? updated : e)
    );
  }

  deleteEvent(event: CalendarEvent) {
    this._events.next(this._events.value.filter(e => e !== event));
  }
}