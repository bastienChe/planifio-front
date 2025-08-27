import { Component } from "@angular/core";
import { AppointmentService } from "../../services/appointment.services";
import { AppointmentDto } from "../../models/appointmentDto";
import { Observable } from "rxjs";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'accueil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [``],
  templateUrl: './accueil.html',
})
export class AccueilComponent {

}