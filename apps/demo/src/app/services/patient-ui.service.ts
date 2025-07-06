import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { DeleteConfirmDialogComponent } from '../components/delete-confirm-dialog/delete-confirm-dialog.component';
import { getPatientFullName } from '../shared/utils/patient.utils';
import { PatientStateService } from './patient-state.service';
import { PatientService, type Patient } from './patient.service';

@Injectable({ providedIn: 'root' })
export class PatientUiService {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);
  private readonly patientService = inject(PatientService);
  private readonly patientStateService = inject(PatientStateService);

  confirmAndDeletePatient(patient: Patient, onSuccess?: () => void): void {
    const fullName = getPatientFullName(patient);

    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: { name: fullName },
      panelClass: 'confirm-dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.patientService.deletePatient(patient.id).subscribe({
          next: () => {
            this.patientStateService.removePatientById(patient.id);
            const message = this.translate.instant('PATIENTS.DELETE_SUCCESS', { name: fullName });
            this.snackBar.open(message, '', { duration: 3000 });
            onSuccess?.();
          },
          error: (err) => {
            console.error('Failed to delete patient:', err);
            this.snackBar.open(this.translate.instant('PATIENTS.DELETE_ERROR'), '', { duration: 3000 });
          },
        });
      }
    });
  }
}
