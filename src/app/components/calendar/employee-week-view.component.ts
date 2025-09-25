import { Component, ViewChild, TemplateRef, OnInit, Input } from '@angular/core';
import {startOfDay,endOfDay,isSameDay,isSameMonth } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarDateFormatter, CalendarEvent,CalendarView } from 'angular-calendar';
import { FlatpickrDefaults } from 'angularx-flatpickr';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CalendarService } from '../../services/calendar.services';
import { EmployeeService } from '../../services/employee.service';
import { getRandomColor } from '../../shared/event-color';
import { EmployeeDto } from '../../models/EmployeeDto';


@Component({
  selector: 'employee-week-view',
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
  templateUrl: './employee-week-view.html',
})
export class EmployeeWeekViewComponent implements OnInit {

  @Input() employeeId: string = '1'; // par défaut utilisateur 1
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  events$!: Observable<CalendarEvent[]>; 
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;
  employees: EmployeeDto[] = [];

  modalData?: {
    action: string;
    event: CalendarEvent;
  };  

  constructor(private modal: NgbModal, 
    private calendarService: CalendarService,
    private employeeService: EmployeeService) { }
  
ngOnInit() {
    this.employeeService.getEmployees().subscribe(employees => {
      console.log('EmployeeWeekView: employees loaded', employees);
      this.employees = employees;
      if (employees.length && !this.employeeId) {
        this.employeeId = this.employeeId = '';
      }
      this.loadEvents();
    });
}

  onEmployeeChange(employeeId: string) {
    this.employeeId = employeeId;
    this.loadEvents();
  }

  private loadEvents() {
    console.log(`EmployeeWeekView: loading events for employee ${this.employeeId}`);
    this.events$ = this.calendarService.getEmployeeEvents$(this.employeeId);
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
        color: getRandomColor(),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    );
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.calendarService.deleteEvent(eventToDelete.id as string);
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