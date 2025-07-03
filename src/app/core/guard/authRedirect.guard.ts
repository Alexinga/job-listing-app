import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const authRedirectGuard: CanMatchFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');
  const expiresAtToken = Number(localStorage.getItem('expiresAtTime') || 0);

  const loggedIn = token && Date.now() < expiresAtToken;
  return loggedIn ? router.createUrlTree(['/']) : true;
};
