import { Routes } from '@angular/router';
import { DemoComponent } from './components/calendar/component';

// Si tu veux une vue semaine plus tard, ajoute un WeekViewAllComponent
export const routes: Routes = [
  { path: 'a', component: DemoComponent },
  { path: '', redirectTo: 'a', pathMatch: 'full' }
];
