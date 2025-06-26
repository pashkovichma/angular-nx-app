import type { Patient } from '../../services/patient.service';

export function getPatientFullName(patient: Patient): string {
  return `${patient.firstName} ${patient.lastName}`;
}
