import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
// @ts-ignore
import {TuiRootModule} from '@taiga-ui/core';
import {provideEventPlugins} from '@taiga-ui/event-plugins';

import {routes} from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CredentialsInterceptor,
    //   multi: true
    // },
        provideEventPlugins(),

    ]
};
