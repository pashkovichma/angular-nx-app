import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { provideRouter, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { AuthInterceptor } from 'auth';
import { LoginComponent } from './app/pages/login/login.component';
import { HelloComponent } from './app/pages/hello/hello.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'hello',
    component: HelloComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(FormsModule),
    provideRouter(routes),
    ...(appConfig.providers ?? []),
  ]
}).catch((err) => console.error(err));
