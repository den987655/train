import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {TuiAlertService} from '@taiga-ui/core';
import {BehaviorSubject, catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {environment} from '../../environment/environment';
import type {SignInForm} from '../auth/components/sign-in/sign-in.component';

export interface AuthResponse {
  error: errorResponse
  status: number;
}

type errorResponse = {
  message: string;
  reason: 'invalidFields' | 'invalidEmail' | 'invalidPassword' | 'invalidUniqueKey'
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  readonly tokenSubject$$ = new BehaviorSubject<string>("");
  authorizeStatus = new BehaviorSubject<boolean>(false)
  readonly authError$$ = new BehaviorSubject<string>("");

  formErrors = {
    email: new BehaviorSubject<string>(""),
    password: new BehaviorSubject<string>(""),
    repeatPassword: new BehaviorSubject<string>(""),
    general: new BehaviorSubject<string>(""),
  };

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
            this.tokenSubject$$.subscribe(token => {
              localStorage.setItem("token", token);
            })
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
    this.authError$$.next("");
    this.http.post<AuthResponse>("/api/signup", {email, password}, {observe: "response"})
      .pipe(
        tap(res => {
          if (res.status === 201) {
            this.router.navigate(["/sign-in"]);
            this.alerts.open("", {
              label: "Successfully registered",
              autoClose: 3000
            }).subscribe();
          }
        }),
        catchError((err: HttpErrorResponse) => {
      if (err.status === 400 && err.error?.reason) {
        const error = err.error as errorResponse;
        switch (error.reason) {
          case "invalidFields":
            this.authError$$.next("Invalid fields");
            break;
          case "invalidEmail":
            this.authError$$.next("Invalid email");
            break;
          case "invalidPassword":
            this.authError$$.next("Invalid password");
            break;
          case "invalidUniqueKey":
            this.formErrors.email.next("Учетная запись с таким адресом уже существует");
            break;
          default:
            this.formErrors.general.next("Неизвестная ошибка");
            break;
        }
      } else {
        this.authError$$.next("Server error");
      }
      return throwError(() => err);
    }),
      ).subscribe(response => {
        return response
    })
  }

logout() {
  this.authError$$.next("");
  this.http.delete("/api/logout", {observe: "response"}).subscribe({
    next: (res) => {
        this.tokenSubject$$.next("");
        localStorage.removeItem("token");
        this.router.navigate(["/sign-in"]);

        this.alerts.open("", {
          label: "Successfully logged out",
          autoClose: 3000
        }).subscribe();

    },
    error: (err) => {
      this.authError$$.next(err.error?.message || 'Logout failed');
    }
  })
}

}



