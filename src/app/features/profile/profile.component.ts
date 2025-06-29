import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {TuiButton, TuiLabel, TuiLink, TuiTextfieldComponent, TuiTextfieldDirective} from '@taiga-ui/core';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [
    TuiButton,
    RouterLink,
    ReactiveFormsModule,
    TuiLabel,
    TuiTextfieldComponent,
    TuiTextfieldDirective,
    TuiLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(protected authService: AuthService) {
  }
  profileForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.pattern("^[\\w\\d_]+@[\\w\\d_]+.\\w{2,7}$")],
      nonNullable: true
    }),
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true
    }),

  })
}
