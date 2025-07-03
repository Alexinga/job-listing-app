import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const authGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);

  const token = localStorage.getItem('authToken');
  const expiredToken = Number(localStorage.getItem('expiresAtTime') || 0);

  const isExpired = Date.now() > expiredToken;
  const isInvalid = !token || isExpired;

  return isInvalid ? router.createUrlTree(['/auth/login']) : true;
  // if (isInvalid) {
  //   router.createUrlTree(['/auth/login']);
  //   return false;
  // }
  // return true;
};
