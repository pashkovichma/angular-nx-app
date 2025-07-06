import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PatientUiService } from '../../services/patient-ui.service';
import type { Patient } from '../../services/patient.service';
import { PatientRoutes } from '../../shared/constants/routes.constants';
import { ActionIconButtonComponent } from '../action-icon-button/action-icon-button.component';

@Component({
  selector: 'app-patient-card',
  standalone: true,
  imports: [
    ActionIconButtonComponent,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientCardComponent {
  private readonly patientUiService = inject(PatientUiService);

  protected readonly PatientRoutes = PatientRoutes;

  readonly patient = input<Patient>();

  handleDelete(): void {
    const patient = this.patient();
    if (!patient) {
      return;
    }

    this.patientUiService.confirmAndDeletePatient(patient);
  }
}
