import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  private router = inject(Router);

  onLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authSignUpToken');
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }
}
