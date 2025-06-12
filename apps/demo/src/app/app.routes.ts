import type { Routes } from '@angular/router';

import { HelloComponent } from './pages/hello/hello.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'hello', component: HelloComponent },
  { path: '**', redirectTo: '' },
];
