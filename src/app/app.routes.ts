import { Routes } from '@angular/router';
import { EmployeeWeekViewComponent } from './components/calendar/employee-week-view.component';
import { TakeAppointmentComponent } from './components/appointments/take-appointment.component';
import { CustomerListComponent } from './components/customers/customer-list/customer-list.component';

export const routes: Routes = [
  { path: 'week', component: EmployeeWeekViewComponent },
  { path: 'take-appointment', component: TakeAppointmentComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: '', redirectTo: 'week', pathMatch: 'full' }
];
