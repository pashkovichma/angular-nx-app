import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { patients, setPatients } from './patient.signal';

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
  private readonly snackBar = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);

  private readonly baseUrl = 'https://683ecbce1cd60dca33dd1dfc.mockapi.io/patients';

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
  }

  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
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

  deleteAndUpdate(id: string): void {
    this.deletePatient(id).subscribe({
      next: () => {
        const current = patients();
        setPatients(current.filter((p) => p.id !== id));
      },
      error: (err) => {
        console.error('Failed to delete patient:', err);
      },
    });
  }

  deletePatientWithFeedback(patient: Patient): void {
    this.deletePatient(patient.id).subscribe({
      next: () => {
        const current = patients();
        setPatients(current.filter((p) => p.id !== patient.id));

        const fullName = `${patient.firstName} ${patient.lastName}`;
        const message = this.translate.instant('PATIENTS.DELETE_SUCCESS', { name: fullName });
        this.snackBar.open(message, '', { duration: 3000 });
      },
      error: (err) => {
        console.error('Failed to delete patient:', err);
        this.snackBar.open(this.translate.instant('PATIENTS.DELETE_ERROR'), '', { duration: 3000 });
      },
    });
  }
}
