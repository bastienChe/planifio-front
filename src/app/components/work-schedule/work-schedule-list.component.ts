import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkScheduleService } from '../../services/work-schedule.service';
import { EmployeeDto, EmployeeService } from '../../services/employee.service';
import { Observable } from 'rxjs';

export interface WorkSlot {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

export interface WorkSchedule {
  [day: string]: WorkSlot[];
}

export interface WorkScheduleDto {
  id?: string;
  startTime: string;
  endTime: string;
  day: string;
  employeeID: string;
  weekNumber: number;
  yearNumber: number;
}

export const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

@Component({
  selector: 'customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './work-schedule-list.html',
  styleUrls: ['./work-schedule-list.css'],
  providers: [WorkScheduleService]
})
export class WorkScheduleComponent implements OnInit {

  filterEmployee = '';
  filterYear = '';
  filterWeek: string = this.getCurrentWeek();

  days = DAYS_OF_WEEK;

  hourOptions: number[] = [];
  minuteOptions: number[] = [0, 15, 30, 45];

  employees$!: Observable<EmployeeDto[]>;

  schedule: WorkSchedule = this.days.reduce((acc, day) => {
    acc[day] = [];
    return acc;
  }, {} as WorkSchedule);

  constructor(private workScheduleService: WorkScheduleService,
    private employeeService: EmployeeService) {}
  
  ngOnInit() {
    this.employees$ = this.employeeService.getEmployees();
    this.generateHourOptions();
  }  
  
  onEmployeeChange() {
    console.log('Employé sélectionné :', this.filterEmployee);
    // this.workScheduleService.loadSchedule(this.filterEmployee, week, year).subscribe(...)
  }

  generateHourOptions() {
    this.hourOptions = [];
    for (let h = 0; h < 24; h++) {
      this.hourOptions.push(h);
    }
  }
  // --- Filtre semaine ---
  getCurrentWeek(): string {
    const now = new Date();
    const onejan = new Date(now.getFullYear(), 0, 1);
    const week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    return `${now.getFullYear()}-W${week.toString().padStart(2, '0')}`;
  }

  nextWeek() { this.changeWeek(1); }
  prevWeek() { this.changeWeek(-1); }

  private changeWeek(delta: number) {
    const [yearStr, weekStr]: string[] = this.filterWeek.split('-W');
    let year = Number(yearStr);
    let week = Number(weekStr) + delta;

    if (week < 1) {
      year -= 1;
      week = this.getWeeksInYear(year);
    } else if (week > this.getWeeksInYear(year)) {
      week = 1;
      year += 1;
    }

    this.filterWeek = `${year}-W${week.toString().padStart(2, '0')}`;
  }

  private getWeeksInYear(year: number): number {
    const d = new Date(year, 11, 31);
    const week = Math.ceil((((d.getTime() - new Date(year, 0, 1).getTime()) / 86400000) + new Date(year,0,1).getDay()+1) / 7);
    return week;
  }

  // --- Gestion des créneaux ---
  addSlot(day: string) {
    this.schedule[day].push({ startHour: 9, startMinute: 0, endHour: 17, endMinute: 0 });
  }

  removeSlot(day: string, index: number) {
    this.schedule[day].splice(index, 1);
  }

  // --- Transformation pour backend ---
  saveSchedule() {
    const [yearStr, weekStr]: string[] = this.filterWeek.split('-W');
    const yearNumber = Number(yearStr);
    const weekNumber = Number(weekStr);
    const employeeID = this.filterEmployee || 'unknown';

    const payload: WorkScheduleDto[] = [];

    for (const day of Object.keys(this.schedule)) {
      this.schedule[day].forEach(slot => {
        const startTime = `${slot.startHour.toString().padStart(2,'0')}:${slot.startMinute.toString().padStart(2,'0')}`;
        const endTime = `${slot.endHour.toString().padStart(2,'0')}:${slot.endMinute.toString().padStart(2,'0')}`;
        payload.push({
          startTime,
          endTime,
          day,
          employeeID,
          weekNumber,
          yearNumber
        });
      });
    }

    console.log('Payload pour backend:', payload);
    // Appel service pour sauvegarder si nécessaire
    // this.workScheduleService.saveSchedule(payload).subscribe(...)
  }
}
