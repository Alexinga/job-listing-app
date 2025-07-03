import {
  AfterContentInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  @ViewChild('navbar', { static: true }) navbarEl!: ElementRef;

  ngAfterContentInit(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        const collapse = bootstrap.Collapse.getInstance(
          this.navbarEl.nativeElement
        );
        if (collapse) {
          collapse.hide();
        }
      });
  }
  toggleCollapse() {
    const collapse = bootstrap.Collapse.getOrCreateInstance(
      this.navbarEl.nativeElement
    );
    if (collapse) {
      collapse.toggle();
    }
  }
  onLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authSignUpToken');
    localStorage.removeItem('expiresAtTime');
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }
}
