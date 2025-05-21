import {type HttpEvent, HttpHandler, HttpHeaders, type HttpInterceptor, HttpRequest} from '@angular/common/http';
import type {Observable} from 'rxjs';
import {environment} from '../../environment/environment';


export class _CredentialsInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newReq = req.clone({
      headers: new HttpHeaders().append('api-key', `${environment.apiKey}`),
      withCredentials: true,
    });
    return next.handle(newReq);
  }
}
