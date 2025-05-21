import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {SignInComponent} from './core/auth/components/sign-in/sign-in.component';
import {SignUpComponent} from './core/auth/components/sign-up/sign-up.component';
import {HomePageComponent} from './core/pages/home-page/home-page.component';

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},

];
