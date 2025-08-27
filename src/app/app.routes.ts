import { Routes } from '@angular/router';
import { EmployeeWeekViewComponent } from './components/calendar/employee-week-view.component';
import { TakeAppointmentComponent } from './components/appointments/take-appointment.component';

export const routes: Routes = [
  { path: 'week', component: EmployeeWeekViewComponent },
  { path: 'take-appointment', component: TakeAppointmentComponent },
  { path: '', redirectTo: 'week', pathMatch: 'full' }
];
