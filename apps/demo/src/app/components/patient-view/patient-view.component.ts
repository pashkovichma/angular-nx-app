import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PatientService } from '../../services/patient.service';
import { getPatientFullName } from '../../shared/utils/patient.utils';
import { ActionIconButtonComponent } from '../action-icon-button/action-icon-button.component';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-patient-view',
  standalone: true,
  imports: [
    ActionIconButtonComponent,
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatDialogModule,
    TranslateModule,
  ],
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss'],
})
export class PatientViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly patientService = inject(PatientService);
  private readonly dialog = inject(MatDialog);

  private readonly patientId = this.route.snapshot.paramMap.get('patientId') ?? '';
  readonly userId = this.route.parent?.snapshot.paramMap.get('userId') ?? '';

  readonly patient = toSignal(this.patientService.getPatient(this.patientId), {
    initialValue: null,
  });

  closeView(): void {
    this.router.navigate(['/hello', this.userId]);
  }

  handleDelete(): void {
    const patient = this.patient();
    if (!patient) {
      return;
    }

    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: { name: getPatientFullName(patient) },
      panelClass: 'confirm-dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.patientService.deletePatientWithFeedback(patient);
        this.closeView();
      }
    });
  }
}
