/*import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';

@Component({
  selector: 'app-vue-semaine',
  standalone: true,
  imports: [FullCalendarModule],
  template: `<h2>Vue Semaine - Par Utilisateur</h2>
             <full-calendar
               [plugins]="calendarPlugins"
               [initialView]="'resourceTimeGridWeek'"
               [resources]="resources"
               [events]="events">
             </full-calendar>`
})
export class WeekViewUserComponent {
  calendarPlugins = []; // FullCalendarModule plugins déjà enregistrés

  resources = [
    { id: 'alice', title: 'Alice' },
    { id: 'bob', title: 'Bob' },
    { id: 'charlie', title: 'Charlie' }
  ];

  events: EventInput[] = [
    { title: 'RDV Alice', start: '2025-08-22T09:00:00', resourceId: 'alice' },
    { title: 'RDV Bob', start: '2025-08-22T10:00:00', resourceId: 'bob' },
    { title: 'RDV Charlie', start: '2025-08-22T11:00:00', resourceId: 'charlie' }
  ];
}*/