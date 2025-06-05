import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User | null> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.get<User[]>(this.apiUrl, { params }).pipe(
      map((users: User[]) => {
        return users.length === 1 ? users[0] : null;
      })
    );
  }
}
