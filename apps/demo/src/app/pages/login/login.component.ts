import {
  Component,
  inject,
  ChangeDetectionStrategy,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';

import { finalize } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { User } from '../../services/user.model';
import { LoginCredentials } from 'libs/auth/src/lib/models/login-credentials.model';

export enum LocalStorageKey {
  AuthToken = 'auth_token'
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ]
    ]
  });

  private readonly _loginResult$ = signal<User | null | undefined>(undefined);
  readonly loginResult = this._loginResult$.asReadonly();

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  get emailCtrl() {
    return this.loginForm.controls.email;
  }

  get passwordCtrl() {
    return this.loginForm.controls.password;
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      return;
    }

    this._loginResult$.set(undefined);
    this.errorMessage.set(null);
    this.loading.set(true);

    const { email, password } = this.loginForm.getRawValue();

    const creds: LoginCredentials = {
      email: email.trim(),
      password: password.trim()
    };

    this.auth
      .login(creds)
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (users: User[]) => {
          if (users.length === 1) {
            this.handleSuccess(users[0]);
          } else {
            this._loginResult$.set(null);
          }
        },
        error: (err) => {
          console.error('Error making request to MockAPI:', err);
          this._loginResult$.set(null);
          this.errorMessage.set('Server error, please try again later.');
        }
      });
  }

  private handleSuccess(user: User): void {
  const token = `mock-token-${user.id}`;
  localStorage.setItem(LocalStorageKey.AuthToken, token);
  this.router.navigate(['/hello']);
}
}
