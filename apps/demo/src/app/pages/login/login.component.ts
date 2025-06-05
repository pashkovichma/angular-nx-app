import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class LoginComponent {
  email = '';
  password = '';
  loginResult: User | null | undefined = undefined;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin(): void {
    this.auth.login(this.email.trim(), this.password.trim()).subscribe({
      next: (userOrNull) => {
        this.loginResult = userOrNull;

        if (userOrNull) {
          const token = `mock-token-${userOrNull.id}`;
          localStorage.setItem('auth_token', token);

          this.router.navigate(['/hello']);
        }
      },
      error: (err) => {
        console.error('Error making request to MockAPI:', err);
        this.loginResult = null;
      }
    });
  }
}
