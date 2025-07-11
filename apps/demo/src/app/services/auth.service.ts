import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginCredentials } from 'auth';
import { Observable } from 'rxjs';
import { toHttpParams } from 'utils';

import { environment } from '../../environments/environment';
import { ApiEndpoint } from '../core/api-endpoints';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  login(creds: LoginCredentials): Observable<User[]> {
    const url = `${environment.apiUrl}${ApiEndpoint.Users}`;

    return this.http.get<User[]>(url, {
      params: toHttpParams({ ...creds }),
    });
  }

  getUser(id: string): Observable<User> {
    const url = `${environment.apiUrl}${ApiEndpoint.Users}/${id}`;

    return this.http.get<User>(url);
  }
}
