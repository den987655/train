import {AsyncPipe, NgIf} from '@angular/common';
import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiButton, TuiError, TuiLabel} from '@taiga-ui/core';
import {TUI_VALIDATION_ERRORS, TuiFieldErrorPipe} from '@taiga-ui/kit';
import { tuiMarkControlAsTouchedAndValidate } from "@taiga-ui/cdk";
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import {AuthService} from '../../../services/auth.service';

export interface SignInForm {
  email: string | null;
  password: string | null;
}

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiButton,
    NgIf,
    AsyncPipe,
    TuiError,
    TuiFieldErrorPipe,
    TuiLabel,
    TuiTextfieldControllerModule
  ],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: "This field is required",
        pattern: "Enter correct email",
        minlength: "Password must be at least 8 characters long",
      },
    },
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: "./sign-in.component.scss",
})
export class SignInComponent {
  formSubmitted = false;
  private readonly cdr = inject(ChangeDetectorRef);
  constructor(protected authService: AuthService) {
  }
  authForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.pattern("^[\\w\\d_]+@[\\w\\d_]+.\\w{2,7}$")],
      nonNullable: true
    }),
    password: new FormControl('', {
     validators: [Validators.required, Validators.minLength(8)], nonNullable: true}
    )
  });

  //геттеры
  get email() {
    return this.authForm.get('email');
  }
  get password() {
    return this.authForm.get('password');
  }

  onSubmit() {
    this.formSubmitted = true;
    // tuiMarkControlAsTouchedAndValidate(this.authForm);
    // this.cdr.detectChanges();

    const value = this.authForm.valid
    if (value) {
     this.authService.signIn(this.authForm.value.email!, this.authForm.value.password!);
    }
  }
}
