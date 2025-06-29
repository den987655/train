import {AsyncPipe, NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {TuiButton, TuiError, TuiIcon, TuiLabel, TuiTextfield} from '@taiga-ui/core';
import {TUI_VALIDATION_ERRORS, TuiFieldErrorPipe, TuiPassword} from '@taiga-ui/kit';
import {TuiInputCopyModule, TuiInputModule} from '@taiga-ui/legacy';
import {filter, from, map, Observable} from 'rxjs';
import {AuthService} from '../../../services/auth.service';

export interface SignUpForm {
  email: string;
  password: string;
  passwordRepeat: string;
}

function validateRepeatPassword({passwordOne, passwordTwo}: { passwordOne: string, passwordTwo: string }) {
  return (control: AbstractControl) => {
    const password = control.get(passwordOne);
    const repeatPassword = control.get(passwordTwo);

    if (!password || !repeatPassword) {
      return null;
    }
    if (password.value !== repeatPassword.value) {
      //TODO password.setErrors({ passwordMismatch: { message: 'Пароли не совпадают...' } }); для одного поля
      return {passwordMismatch: {message: 'Пароли не совпадают'}};
    }
    return null;
  }
}

@Component({
  selector: 'app-sign-up',
  imports: [
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    TuiButton,
    TuiError,
    TuiFieldErrorPipe,
    TuiInputCopyModule,
    TuiInputModule,
    TuiLabel,
    TuiTextfield,
    TuiPassword,
    TuiIcon,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'This field is required',
        pattern: 'Enter correct email',
        minlength: 'Password must be at least 8 characters long',
      },
    },
  ],
})

export class SignUpComponent {
  formSubmitted = false;
  timer = 0

  constructor(protected authService: AuthService) {
    const array = [1, 2, 3];
    const newArray = array.map((n) => n * 2)
      .filter((n) => n > 2)
    console.log(newArray); // [4, 6]

    from([1, 2, 3])
      .pipe(
        map((n) => n * 2),
        filter((n) => n > 2),
      )
  }

  signUpForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.pattern('^[\\w\\d_]+@[\\w\\d_]+.\\w{2,7}$')],
      nonNullable: true
    }),
    password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)], nonNullable: true
      }
    ),
    passwordRepeat: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8),], nonNullable: true
      }
    )
  }, validateRepeatPassword({passwordOne: 'password', passwordTwo: 'passwordRepeat'}));

  //геттеры
  // get email() {
  //   return this.authForm.get('email');
  // }
  // get password() {
  //   return this.authForm.get('password');
  // }


  get f() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    this.formSubmitted = true;

    const value = this.signUpForm.valid
    if (value) {
      this.authService.signUp(this.signUpForm.value.email!, this.signUpForm.value.password!);
    }
  }

   sayHi() {
    alert('Привет');
  }



}

//function greet(name) {
//   console.log(`Hello, ${name}!`);
// }
//
// let timeoutID = setTimeout(greet, 2000, "World"); // Execute greet("World") after 2 seconds
//
// clearTimeout(timeoutID); //Cancels the timeout
