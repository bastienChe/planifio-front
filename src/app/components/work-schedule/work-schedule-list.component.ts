import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkScheduleService } from '../../services/work-schedule.service';
export interface WorkSlot {
  start: string; // ex: "09:00"
  end: string;   // ex: "17:00"
}

export interface WorkSchedule {
  [day: string]: WorkSlot[];
}

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

@Component({
  selector: 'customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './work-schedule-list.html',
  styleUrl: './work-schedule-list.css',
  providers: [WorkScheduleService]
})
export class WorkScheduleComponent  {

  filterEmployee = '';
  filterWeek = '';
  filterYear = '';

  days = DAYS_OF_WEEK;

  schedule: WorkSchedule = this.days.reduce((acc, day) => {
    acc[day] = [];
    return acc;
  }, {} as WorkSchedule);

  addSlot(day: string) {
    this.schedule[day].push({ start: '', end: '' });
  }

  removeSlot(day: string, index: number) {
    this.schedule[day].splice(index, 1);
  }

  saveSchedule() {
    console.log('Work schedule saved:', this.schedule);
    // Ici tu pourrais appeler ton service pour sauvegarder en base
  }

}