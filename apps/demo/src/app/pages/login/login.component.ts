import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ControlsOf, FormBuilder, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { AuthLocalStorageKey, LoginCredentials } from 'auth';
import { finalize, take } from 'rxjs/operators';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from 'utils';

import { AuthService } from '../../services/auth.service';
import { User } from '../../services/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly loginForm: FormGroup<ControlsOf<LoginCredentials>>;

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly loginError = signal<unknown | null>(null);

  constructor() {
    this.loginForm = this.createLoginForm();
  }

  private createLoginForm(): FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(PASSWORD_PATTERN)]],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      return;
    }

    this.errorMessage.set(null);
    this.loading.set(true);

    const { email, password } = this.loginForm.value;

    const creds: LoginCredentials = {
      email: email.trim(),
      password: password.trim(),
    };

    this.auth
      .login(creds)
      .pipe(
        take(1),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (users: User[]) => {
          if (!users.length) {
            this.loginForm.setErrors({ invalidCreds: true });
            return;
          }

          this.handleSuccess(users[0]);
        },
        error: (err) => {
          this.loginError.set(err);
          this.loginForm.setErrors({ invalidCreds: true });
          this.errorMessage.set('Server error, please try again later.');
        },
      });
  }

  private handleSuccess({ id }: User): void {
    localStorage.setItem(AuthLocalStorageKey.Token, `mock-token-${id}`);
    this.router.navigate(['/hello']);
  }
}
