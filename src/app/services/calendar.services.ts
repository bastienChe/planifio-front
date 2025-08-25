// calendar.service.ts
import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class CalendarService {  

    private _users = new BehaviorSubject<Map<string, User>>(new Map());
    users$: Observable<Map<string, User>> = this._users.asObservable();

  constructor() {
    // Exemple de données initiales
    const initialUser: User = {
      id: '1',
      name: 'Alice',
      events: [
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
      ],
    };
    this._users.next(new Map([[initialUser.id, initialUser]]));
  }

  getUserEvents(userId: string): CalendarEvent[] {
    return this._users.value.get(userId)?.events || [];
  }

  addEvent(userId: string, event: CalendarEvent) {
    const users = new Map(this._users.value);
    const user = users.get(userId);
    if (user) {
      user.events = [...user.events, event];
      users.set(userId, { ...user });
      this._users.next(users);
    }
  }

  updateEvent(userId: string, updated: CalendarEvent) {
    const users = new Map(this._users.value);
    const user = users.get(userId);
    if (user) {
      user.events = user.events.map(e => e === updated ? updated : e);
      users.set(userId, { ...user });
      this._users.next(users);
    }
  }

  deleteEvent(userId: string, event: CalendarEvent) {
    const users = new Map(this._users.value);
    const user = users.get(userId);
    if (user) {
      user.events = user.events.filter(e => e !== event);
      users.set(userId, { ...user });
      this._users.next(users);
    }
  }
}