import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {
  DateAdapter,
  CalendarUtils,
  CalendarA11y,
  CalendarEventTitleFormatter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { importProvidersFrom } from '@angular/core';
import { CommonModule, I18nPluralPipe } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(App, {
  providers: [
    { provide: DateAdapter, useFactory: adapterFactory },
    CalendarUtils,
    CalendarA11y,
    CalendarEventTitleFormatter,
    I18nPluralPipe,
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(CommonModule) // pour _I18nPluralPipe et autres pipes
  ]
}).catch(err => console.error(err));
