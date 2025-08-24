import { Component } from '@angular/core';
import { CalendarModule } from 'angular-calendar';
import { RouterOutlet } from '@angular/router';
import { CalendarCommonModule } from 'angular-calendar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
