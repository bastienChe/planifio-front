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
  currentYear!: number;
  currentWeek!: number;

  modalData?: {
    action: string;
    event: CalendarEvent;
  };  

  constructor(private modal: NgbModal, 
    private calendarService: CalendarService,
    private employeeService: EmployeeService) { }
  
  ngOnInit() {
    const { year, week } = this.getCurrentWeekAndYear();
    this.currentYear = year;
    this.currentWeek = week;
    this.employeeService.getEmployees().subscribe(employees => {
      console.log('EmployeeWeekView: employees loaded', employees);
      this.employees = employees;
      if (employees.length && !this.employeeId) {
        this.employeeId = this.employeeId = '';
      }
      this.loadEvents();
    });
  }

  private getCurrentWeekAndYear(): { year: number, week: number } {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((now.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    const week = Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
    return { year: now.getFullYear(), week };
  }

  onEmployeeChange(employeeId: string) {
    this.employeeId = employeeId;
    this.loadEvents();
  }

  private loadEvents() {
    if (!this.employeeId) return;
    this.events$ = this.calendarService.getEmployeeEvents$(this.employeeId, this.currentYear, this.currentWeek);
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
    if (!this.employeeId) return;
    this.calendarService.addEvent(this.employeeId, {
      title: 'Nouveau RDV',
      startTime: new Date().toISOString(),
      endTime: new Date(new Date().getTime() + 30 * 60 * 1000).toISOString() // +30 min
    }).subscribe(() => this.loadEvents());
  }

  deleteEvent(event: CalendarEvent) {
    this.calendarService.deleteEvent(event.id as string)
      .subscribe(() => this.loadEvents());
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  changeWeek(delta: number) {
    let week = this.currentWeek + delta;
    let year = this.currentYear;

    if (week < 1) {
      year -= 1;
      week = this.getWeeksInYear(year);
    } else if (week > this.getWeeksInYear(year)) {
      week = 1;
      year += 1;
    }

    this.currentWeek = week;
    this.currentYear = year;

    this.loadEvents(); // recharge les events pour la nouvelle semaine
  }

  private getWeeksInYear(year: number): number {
    const d = new Date(year, 11, 31);
    const oneJan = new Date(year, 0, 1);
    const numberOfDays = Math.floor((d.getTime() - oneJan.getTime()) / (24*60*60*1000));
    return Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
  }

}