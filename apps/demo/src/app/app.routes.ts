import type { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

export enum AppRoutes {
  Root = '',
  Hello = 'hello',
  UserIdParam = ':userId',
  Wildcard = '**',
}

export const routes: Routes = [
  { path: AppRoutes.Root, component: LoginComponent },
  {
    path: `${AppRoutes.Hello}/${AppRoutes.UserIdParam}`,
    loadChildren: () => import('./pages/hello/hello.routes').then((m) => m.helloRoutes),
  },
  { path: AppRoutes.Wildcard, redirectTo: AppRoutes.Root },
];
