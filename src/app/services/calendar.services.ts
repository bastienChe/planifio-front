// calendar.service.ts
import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { getRandomColor } from '../shared/event-color';
import { HttpClient } from '@angular/common/http';
import { EmployeeCalendarEvent } from '../models/employee-calendar-event';

@Injectable({ providedIn: 'root' })
export class CalendarService {  
  private baseUrl = 'http://localhost:8081/planifio';

  constructor(private http: HttpClient) {
  }

  getEmployeeEvents$(employeeId: string, yearNumber: number, weekNumber: number): Observable<CalendarEvent[]> {
    return this.http.get<EmployeeCalendarEvent[]>(`${this.baseUrl}/employee/${employeeId}/planning/year/${yearNumber}/week/${weekNumber}`)
      .pipe(
        map(events =>
          events.map(e => ({
            id: e.id,
            title: e.title,
            start: new Date(e.startTime),
            end: new Date(e.endTime),
            color: getRandomColor(),
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            }
          }))
        )
      );
  }

  addEvent(employeeId: string, event: Partial<EmployeeCalendarEvent>): Observable<CalendarEvent> {
    return this.http.post<EmployeeCalendarEvent>(`${this.baseUrl}/planning/${employeeId}`, event)
      .pipe(
        map(e => ({
          id: e.id,
          title: e.title,
          start: new Date(e.startTime),
          end: new Date(e.endTime),
          color: getRandomColor(),
          draggable: true,
          resizable: { beforeStart: true, afterEnd: true }
        }))
      );
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/planning/${eventId}`);
  }

  updateEvent(eventId: string, updated: Partial<EmployeeCalendarEvent>): Observable<CalendarEvent> {
    return this.http.put<EmployeeCalendarEvent>(`${this.baseUrl}/planning/${eventId}`, updated)
      .pipe(
        map(e => ({
          id: e.id,
          title: e.title,
          start: new Date(e.startTime),
          end: new Date(e.endTime),
          color: getRandomColor(),
          draggable: true,
          resizable: { beforeStart: true, afterEnd: true }
        }))
      );
  }
}