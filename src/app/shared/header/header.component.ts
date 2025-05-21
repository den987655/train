import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {TuiLink} from '@taiga-ui/core';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    TuiLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
