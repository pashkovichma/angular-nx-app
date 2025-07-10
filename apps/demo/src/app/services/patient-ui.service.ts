import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { catchError, filter, Observable, switchMap, tap, throwError } from 'rxjs';

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

  openDeleteConfirmDialog(patient: Patient) {
    const fullName = getPatientFullName(patient);
    return this.dialog.open(DeleteConfirmDialogComponent, {
      data: { name: fullName },
      panelClass: 'confirm-dialog',
      disableClose: true,
    });
  }

  deletePatient(patient: Patient): Observable<void> {
    return this.patientService.deletePatient(patient.id).pipe(
      tap(() => {
        this.patientStateService.removePatientById(patient.id);
        const message = this.translate.instant('PATIENTS.DELETE_SUCCESS', { name: getPatientFullName(patient) });
        this.snackBar.open(message, '', { duration: 3000 });
      }),
      catchError((err) => {
        console.error('Failed to delete patient:', err);
        this.snackBar.open(this.translate.instant('PATIENTS.DELETE_ERROR'), '', { duration: 3000 });
        return throwError(() => err);
      }),
    );
  }

  confirmAndDeletePatient(patient: Patient): Observable<void> {
    const dialogRef = this.openDeleteConfirmDialog(patient);

    return dialogRef.afterClosed().pipe(
      filter((confirmed) => confirmed === true),
      switchMap(() => this.deletePatient(patient)),
    );
  }
}
