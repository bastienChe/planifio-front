import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
