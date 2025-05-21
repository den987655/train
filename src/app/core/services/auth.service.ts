import {HttpClient, HttpResponse} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {TuiAlertService} from '@taiga-ui/core';
import {BehaviorSubject, catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {environment} from '../../environment/environment';
import type {SignInForm} from '../auth/components/sign-in/sign-in.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenSubject$$ = new BehaviorSubject<string>("");
  authorized = new Observable<boolean>()
  readonly authError$$ = new BehaviorSubject<string>("");
  private readonly alerts = inject(TuiAlertService)

  constructor(private http: HttpClient,
              private router: Router,
  ) {
  }

  // signIn1(email: string, password: string) {
  //   this.http.post<{token: string}>(`/api/signin`, {email, password}, { observe: "response" }).subscribe(
  //     {
  //       next: (response) =>{
  //         debugger
  //         if (response.status === 201) {
  //           const token = response.body?.token
  //           if (!token) return;
  //           if (token) {
  //             this.tokenSubject$$.next(token)
  //             this.router.navigate(["/"])
  //             this.alerts.open('', {
  //               label: 'Ok',
  //
  //             }).subscribe();
  //           }
  //
  //         }
  //   },
  //       error: (error) => {
  //         if (error.status === 400) {
  //           this.authError$$.next('Email is wrong');
  //         } else {
  //           this.authError$$.next('Something went wrong');
  //         }
  //       }
  //     }
  //
  //   )
  // }

  signIn(email: string, password: string) {
    this.http.post<{ token: string }>("/api/signin", {email, password}, {observe: "response"}).subscribe({
      next: (res) => {
        if (res.status === 201) {
          const token = res.body?.token;
          if (!token) return;
          if (token) {
            this.tokenSubject$$.next(token);
            this.router.navigate(["/"]);
            this.alerts.open("", {
              label: "Successfully logged in",
              autoClose: 3000
            }).subscribe();
          }
        }


      },
      error: (err) => {
        if (err.status === 400) {
          this.authError$$.next("Email is wrong");
        } else {
          this.authError$$.next("Something went wrong");
        }
      }
    })
  }

  signUp(email: string, password: string) {
    this.http.post(`api/signup`, {email, password}, {observe: "response"}).subscribe({
  next: (res:HttpResponse<object>) => {
    if (res.status === 201) {
        this.router.navigate(["/sign-in"]);
        this.alerts.open("", {
          label: "Successfully registered",
          autoClose: 3000
        }).subscribe();
      }
    },
  error: (err) => {
    if (err.status === 400) {
      this.authError$$.next("user already exists");
    }
  }
})
}

}


