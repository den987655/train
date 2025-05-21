import {AsyncPipe, NgIf} from '@angular/common';
import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiButton, TuiError, TuiLabel} from '@taiga-ui/core';
import {TuiFieldErrorPipe} from '@taiga-ui/kit';
import {TuiInputCopyModule, TuiInputModule} from '@taiga-ui/legacy';
import {AuthService} from '../../../services/auth.service';

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
    TuiLabel
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  formSubmitted = false;
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
