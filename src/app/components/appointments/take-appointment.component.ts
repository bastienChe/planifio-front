import { Component, OnInit } from "@angular/core";
import { AppointmentService } from "../../services/appointment.services";
import { AppointmentDto } from "../../models/appointmentDto";
import { Observable } from "rxjs";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { EmployeeDto } from "../../models/EmployeeDto";
import { EmployeeService } from "../../services/employee.service";

@Component({
  selector: 'take-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './take-appointment.css',
  templateUrl: './take-appointment.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [ // quand un step arrive
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [ // quand un step part
        animate('400ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TakeAppointmentComponent implements OnInit {
  appointments$: Observable<AppointmentDto[]>;
  employees: EmployeeDto[] = [];   // <-- liste des praticiens


  selectedAppointmentId?: string;
  currentStep = 1;
  
  selectedSalon: string | null = null;
  selectedEmployee: string | null = null;
  selectedPrestation: string | null = null;

  constructor(private appointmentService: AppointmentService, private employeeService: EmployeeService) {
    this.appointments$ = this.appointmentService.getAvaibleAppointments$();
    this.generateTimeSlots();
  }

  ngOnInit() {
    this.showStep(1);
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des employés", err);
      }
    });
  }

  showStep(step: number) {
    this.currentStep = step;
  }


  days: string[] = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
  timeSlots: string[] = [];

  selectedSlot: string | null = null;


  generateTimeSlots() {
    const startHour = 8;
    const endHour = 18;
    const slots: string[] = [];

    for (let h = startHour; h < endHour; h++) {
      slots.push(`${h}:00`);
      slots.push(`${h}:30`);
    }
    slots.push(`${endHour}:00`); // dernier créneau pile
    this.timeSlots = slots;
  }

  selectSlot(day: string, time: string) {
    this.selectedSlot = `${day}-${time}`;
  }

  isSelected(day: string, time: string): boolean {
    return this.selectedSlot === `${day}-${time}`;
  }

}