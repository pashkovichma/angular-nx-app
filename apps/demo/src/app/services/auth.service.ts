import { Injectable, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';

import { AppRoutes } from '../app.routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth0 = inject(Auth0Service);
  private readonly router = inject(Router);

  readonly currentUser = toSignal(this.auth0.user$, { initialValue: null });
  readonly appState = toSignal(this.auth0.appState$, { initialValue: null });

  login(): void {
    this.auth0.loginWithRedirect({
      appState: {
        target: `/${AppRoutes.Hello}`,
      },
    });
  }

  logout(): void {
    this.auth0.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }

  readonly redirectEffect = effect(() => {
    const user = this.currentUser();
    const state = this.appState();

    if (user?.sub && state?.target) {
      this.router.navigate(['/', AppRoutes.Hello, user.sub]);
    }
  });
}
