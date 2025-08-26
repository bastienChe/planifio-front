import { Component } from "@angular/core";
import { AppointmentService } from "../../services/appointments.services";
import { Appointment } from "../../models/appointment";
import { Observable } from "rxjs";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'take-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [``],
  templateUrl: './take-appointment.html',
})
export class TakeAppointmentComponent {
  appointments$: Observable<Appointment[]>;

  selectedAppointmentId?: string; // pour récupérer la sélection

  constructor(private appointmentService: AppointmentService) {
    this.appointments$ = this.appointmentService.getAvaibleAppointments$();
  }
}