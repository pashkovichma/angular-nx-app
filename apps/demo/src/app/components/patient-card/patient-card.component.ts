import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import type { Patient } from '../../services/patient.service';
import { PatientService } from '../../services/patient.service';
import { getPatientFullName } from '../../shared/utils/patient.utils';
import { ActionIconButtonComponent } from '../action-icon-button/action-icon-button.component';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-patient-card',
  standalone: true,
  imports: [
    ActionIconButtonComponent,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss'],
})
export class PatientCardComponent {
  private readonly _patient = signal<Patient | null>(null);
  private readonly dialog = inject(MatDialog);
  private readonly patientService = inject(PatientService);

  @Input() set patient(value: Patient) {
    this._patient.set(value);
  }

  get patient(): Patient | null {
    return this._patient();
  }

  handleDelete(): void {
    const patient = this.patient;
    if (!patient) {
      return;
    }

    const fullName = getPatientFullName(patient);

    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: { name: fullName },
      panelClass: 'confirm-dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.patientService.deletePatientWithFeedback(patient);
      }
    });
  }
}
