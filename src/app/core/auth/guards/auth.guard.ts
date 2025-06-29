import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {

  const token = inject(AuthService).tokenSubject$$.getValue();
  console.log(token);
  if (token) {
    return true;
  }
  return inject(Router).createUrlTree(['/sign-in'])

};
