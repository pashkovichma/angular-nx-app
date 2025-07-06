import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AppRoutes } from '../../app.routes';
import { PatientUiService } from '../../services/patient-ui.service';
import { PatientService } from '../../services/patient.service';
import { ActionIconButtonComponent } from '../action-icon-button/action-icon-button.component';

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
  private readonly patientUiService = inject(PatientUiService);

  private readonly patientId = this.route.snapshot.paramMap.get('patientId') ?? '';
  readonly userId = this.route.parent?.snapshot.paramMap.get('userId') ?? '';

  protected readonly AppRoutes = AppRoutes;

  readonly patient = toSignal(this.patientService.getPatient(this.patientId), {
    initialValue: null,
  });

  closeView(): void {
    this.router.navigate([AppRoutes.Hello, this.userId]);
  }

  handleDelete(): void {
    const patient = this.patient();
    if (!patient) {
      return;
    }

    this.patientUiService.confirmAndDeletePatient(patient, () => this.closeView());
  }
}
