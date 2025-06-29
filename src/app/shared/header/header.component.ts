import {AsyncPipe} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TuiLink} from '@taiga-ui/core';
import {map, type Observable} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    TuiLink,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(protected authService: AuthService) {
    this.isAuthenticated$ = this.authService.tokenSubject$$.pipe(
      map((token) => !!token)
      )
  }

  logoutHandler() {
      this.authService.logout();
  }
}
