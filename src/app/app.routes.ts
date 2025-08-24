import { Routes } from '@angular/router';
import { UserWeekView } from './components/calendar/user-week-view';

// Si tu veux une vue semaine plus tard, ajoute un WeekViewAllComponent
export const routes: Routes = [
  { path: 'week', component: UserWeekView },
  { path: '', redirectTo: 'week', pathMatch: 'full' }
];
