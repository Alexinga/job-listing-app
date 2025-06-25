import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const authGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);

  const token = localStorage.getItem('authToken');
  if (token) {
    return true;
  }
  return router.createUrlTree(['/auth/login']);
};
