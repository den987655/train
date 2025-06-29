import {type HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {switchMap, take} from 'rxjs';
import {AuthService} from '../services/auth.service';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return authService.tokenSubject$$.pipe(
    take(1),
    switchMap((token) => {
      if (token) {
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(clonedReq);
      }
      return next(req);
    })
  );
};
