import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { LoginCredentials } from 'libs/auth/src/lib/models/login-credentials.model';

export enum ApiEndpoint {
  Users = '/users'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  login(creds: LoginCredentials): Observable<User[]> {
    const apiUrl = `${environment.apiUrl}${ApiEndpoint.Users}`;

    const params = new HttpParams()
      .set('email', creds.email)
      .set('password', creds.password);

    return this.http.get<User[]>(apiUrl, { params });
  }
}
