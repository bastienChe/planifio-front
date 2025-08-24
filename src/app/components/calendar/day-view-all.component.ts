/*import { Component } from '@angular/core';
import { CalendarModule, CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { addMinutes } from 'date-fns';
import { CalendarPipesModule } from './calendar-pipes.module';

function getRandomColor(): { primary: string; secondary: string } {
  const letters = '0123456789ABCDEF';
  let primary = '#';
  let secondary = '#';
  for (let i = 0; i < 6; i++) {
    primary += letters[Math.floor(Math.random() * 16)];
    secondary += letters[Math.floor(Math.random() * 16)];
  }
  return { primary, secondary };
}

@Component({
  selector: 'app-vue-jour',
  standalone: true,
  imports: [CalendarModule, CalendarPipesModule],
  providers: [CalendarDateFormatter],
  template: `
    <h2>Vue Jour - Tous les RDV</h2>
    <div>{{ events.length | i18nPlural: { '=0': 'Aucun RDV', '=1': 'Un RDV', 'other': '{} RDVs' } }}</div>
    <mwl-calendar-day-view
      [viewDate]="viewDate"
      [events]="events"
      [dayStartHour]="8"
      [dayEndHour]="18">
    </mwl-calendar-day-view>
  `
})
export class DayViewAllComponent {
  viewDate: Date = new Date(2025, 7, 22);

  events: CalendarEvent[] = [
    {
      start: new Date(2025, 7, 22, 9, 0),
      end: addMinutes(new Date(2025, 7, 22, 9, 0), 30),
      title: 'RDV Alice',
      color: getRandomColor()
    },
    {
      start: new Date(2025, 7, 22, 10, 0),
      end: addMinutes(new Date(2025, 7, 22, 10, 0), 30),
      title: 'RDV Bob',
      color: getRandomColor()
    },
    {
      start: new Date(2025, 7, 22, 11, 0),
      end: addMinutes(new Date(2025, 7, 22, 11, 0), 30),
      title: 'RDV Charlie',
      color: getRandomColor()
    }
  ];
}
*/