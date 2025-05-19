import { routes } from './../../app.routes';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('Token') !== null) {
      return true;
    } else {
      console.log('Errorrrr');
      router.navigate(['/login']);
      return false;
    }
  } else return false;
};
