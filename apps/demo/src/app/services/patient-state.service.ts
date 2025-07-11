import { Injectable, signal } from '@angular/core';

import type { Patient } from './patient.service';

@Injectable({ providedIn: 'root' })
export class PatientStateService {
  readonly patients = signal<Patient[]>([]);

  setPatients(patients: Patient[]): void {
    this.patients.set(patients);
  }

  addPatient(patient: Patient): void {
    this.patients.update((current) => [...current, patient]);
  }

  addPatients(patients: Patient[]): void {
    this.patients.update((current) => [...current, ...patients]);
  }

  updatePatient(updated: Patient): void {
    this.patients.update((current) => current.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
  }

  removePatientById(id: string): void {
    this.patients.update((current) => current.filter((p) => p.id !== id));
  }
}
