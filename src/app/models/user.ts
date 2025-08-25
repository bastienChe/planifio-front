import { CalendarEvent } from 'angular-calendar';

export interface User {
  id: string;
  name: string;
  events: CalendarEvent[];
}