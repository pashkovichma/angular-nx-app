import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '@translate';

import { AppRoutes } from '../../app.routes';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, MatButtonModule, TranslateModule, LanguageSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  private readonly currentUser = toSignal(this.auth.user$, { initialValue: null });

  login(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: `/${AppRoutes.Hello}`,
      },
    });
  }

  private readonly redirectEffect = effect(() => {
    const user = this.currentUser();

    if (user?.sub) {
      this.router.navigate(['/', AppRoutes.Hello, user.sub]);
    }
  });
}
