import { Injectable, signal } from '@angular/core';

import type { Patient } from './patient.service';

@Injectable({ providedIn: 'root' })
export class PatientStateService {
  private readonly _patients = signal<Patient[]>([]);

  readonly patients = this._patients.asReadonly();

  setPatients(patients: Patient[]): void {
    this._patients.set(patients);
  }

  addPatient(patient: Patient): void {
    this._patients.update((current) => [...current, patient]);
  }

  addPatients(patients: Patient[]): void {
    this._patients.update((current) => [...current, ...patients]);
  }

  updatePatient(updated: Patient): void {
    this._patients.update((current) => current.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
  }

  removePatientById(id: string): void {
    this._patients.update((current) => current.filter((p) => p.id !== id));
  }
}
