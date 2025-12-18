import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const userRol = sessionStorage.getItem('froles')
  if ((userRol !== null) && (userRol.includes("bgeneral")) && (userRol.length > 1)){
    return true;
  } else{
    router.navigateByUrl('auth');
    return false;
  }
};
