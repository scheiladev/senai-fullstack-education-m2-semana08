import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showHeader = true;

  constructor(private router: Router) {
    this.router.events.subscribe((retorno) => {
      if (retorno instanceof NavigationEnd) {
        this.showHeader = !this.router.url.includes('login');
      }
    });
  }
}
