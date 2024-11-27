import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginGuard: CanMatchFn = (route, segments) => {

  const router = inject(Router);

  const token = JSON.parse(localStorage.getItem('user')!);
  const idToken = token.idToken;


  return idToken? true : router.navigateByUrl('/login');
  ;
};
