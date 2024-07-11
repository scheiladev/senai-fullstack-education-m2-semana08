import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router = inject(Router);

  sair() {
    if (window.confirm('Deseja sair do sistema?')) {
      this.router.navigate(['/login']);
    } else {
      return;
    }
  }
}
