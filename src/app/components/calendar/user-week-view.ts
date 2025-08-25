import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, Input } from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth, addHours } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarDateFormatter, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent,CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { FlatpickrDefaults } from 'angularx-flatpickr';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CalendarService } from '../../services/calendar.services';
import { map } from 'rxjs/operators';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'user-week-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
  providers: [CalendarDateFormatter, FlatpickrDefaults],
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  animations: [
    trigger('collapse', [
      state('void', style({ height: '0', overflow: 'hidden' })),
      state('*', style({ height: '*', overflow: 'hidden' })),
      transition('void <=> *', animate('300ms ease')),
    ]),
  ],
  templateUrl: './user-week-view.html',
})
export class UserWeekView implements OnInit {

  @Input() userId: string = '1'; // par défaut utilisateur 1
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  events$!: Observable<CalendarEvent[]>; 
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;

  modalData?: {
    action: string;
    event: CalendarEvent;
  };  
  
  users = [
    { id: '1', name: 'Utilisateur 1' },
    { id: '2', name: 'Utilisateur 2' },
    { id: '3', name: 'Utilisateur 3' },
  ];

  constructor(private modal: NgbModal, private calendarService: CalendarService) { }
  
  ngOnInit() {
    const userId = '1';
    this.events$ = this.calendarService.users$.pipe(
        map(users => users.get(userId)?.events || [])
    );
  }
  
  onUserChange(userId: string) {
    this.userId = userId;
    this.loadEvents();
  }

  private loadEvents() {
    this.events$ = this.calendarService.users$.pipe(
      map(users => users.get(this.userId)?.events || [])
    );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.calendarService.addEvent("1",
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    );
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.calendarService.deleteEvent("1",eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  
  /*
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];*/
  
/*
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }*/

}