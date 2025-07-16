import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideTranslate } from '@translate';

import { routes } from './app.routes';
import { authConfig } from './config/auth.config';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { NotFoundInterceptor } from './interceptors/not-found.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: NotFoundInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    importProvidersFrom(BrowserAnimationsModule, FormsModule),
    provideRouter(routes),
    provideTranslate(),
    provideAuth0(authConfig),
  ],
};
