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
    const user1: User = {
      id: '1',
      name: 'Utilisateur 1',
      events: [
        {
          start: new Date(new Date().setHours(8, 30, 0, 0)),
          end: new Date(new Date().setHours(9, 0, 0, 0)),
          title: 'RDV Tom',
          draggable: true,
          resizable: { beforeStart: true, afterEnd: true },
        },
      ],
    };

    const user2: User = {
      id: '2',
      name: 'Utilisateur 2',
      events: [
        {
          start: new Date(new Date().setHours(10, 0, 0, 0)),
          end: new Date(new Date().setHours(10, 30, 0, 0)),
          title: 'RDV Mr X',
          draggable: true,
          resizable: { beforeStart: true, afterEnd: true },
        },
      ],
    };

    const user3: User = {
      id: '3',
      name: 'Utilisateur 3',
      events: [
        {
          start: new Date(new Date().setHours(14, 0, 0, 0)),
          end: new Date(new Date().setHours(15, 0, 0, 0)),
          title: 'RDV client',
          draggable: true,
          resizable: { beforeStart: true, afterEnd: true },
        },
      ],
    };

    this._users.next(
      new Map([
        [user1.id, user1],
        [user2.id, user2],
        [user3.id, user3],
      ])
    );
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