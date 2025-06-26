import { signal } from '@angular/core';

import type { Patient } from './patient.service';

export const patients = signal<Patient[]>([]);

export function setPatients(list: Patient[]): void {
  patients.set(list);
}

export function updatePatientInList(updated: Patient): void {
  patients.update((current) => current.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
}
