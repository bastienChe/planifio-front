import { Routes } from '@angular/router';
import { EmployeeWeekViewComponent } from '../../components/calendar/employee-week-view.component';
import { TakeAppointmentComponent } from '../../components/appointments/take-appointment.component';
import { CustomerListComponent } from '../../components/customers/customer-list.component';
import { CustomerDetailComponent } from '../../components/customers/customer-detail.component';
import { AccueilComponent } from '../../components/accueil/accueil.component';

export const routes: Routes = [
  { path: 'pro-landing', component: AccueilComponent },
  { path: 'week', component: EmployeeWeekViewComponent },
  { path: 'take-appointment', component: TakeAppointmentComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/:id', component: CustomerDetailComponent }, 
  { path: '', redirectTo: 'pro-landing', pathMatch: 'full' }
];
