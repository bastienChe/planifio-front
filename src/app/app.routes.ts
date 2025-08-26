import { Routes } from '@angular/router';
import { UserWeekViewComponent } from './components/calendar/user-week-view.component';
import { TakeAppointmentComponent } from './components/appointments/take-appointment.component';

export const routes: Routes = [
  { path: 'week', component: UserWeekViewComponent },
  { path: 'take-appointment', component: TakeAppointmentComponent },
  { path: '', redirectTo: 'week', pathMatch: 'full' }
];
