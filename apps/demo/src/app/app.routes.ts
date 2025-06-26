import type { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'hello/:userId',
    loadChildren: () => import('./pages/hello/hello.routes').then((m) => m.helloRoutes),
  },
  { path: '**', redirectTo: '' },
];
