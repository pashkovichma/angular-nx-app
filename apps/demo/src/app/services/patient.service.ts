import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: string;
  newsletter: boolean;
  startDate: string;
  endDate: string;
  notes: string;
  birthdate: string;
}

@Injectable({ providedIn: 'root' })
export class PatientService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'https://683ecbce1cd60dca33dd1dfc.mockapi.io/patients';

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
  }

  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  getPatientsPage(page: number, limit: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}?page=${page}&limit=${limit}`);
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.baseUrl, patient);
  }

  updatePatient(id: string, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/${id}`, patient);
  }

  deletePatient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
