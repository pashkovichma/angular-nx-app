import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '@translate';

import { AppRoutes } from '../../app.routes';
import { PatientCardComponent } from '../../components/patient-card/patient-card.component';
import { AuthService } from '../../services/auth.service';
import { PatientStateService } from '../../services/patient-state.service';
import { PatientService } from '../../services/patient.service';
import type { User } from '../../services/user.model';
import { PATIENT_PAGINATION_LIMIT, SCROLL_THRESHOLD_PX } from '../../shared/constants/constants';
import { PatientRoutes } from '../../shared/constants/routes.constants';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [
    CommonModule,
    LanguageSwitcherComponent,
    PatientCardComponent,
    RouterModule,
    TranslateModule,
    MatCardModule,
  ],
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss'],
})
export class HelloComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly patientService = inject(PatientService);
  private readonly patientStateService = inject(PatientStateService);

  protected readonly AppRoutes = AppRoutes;
  protected readonly PatientRoutes = PatientRoutes;

  readonly userId = (() => {
    const id = this.route.snapshot.paramMap.get('userId');
    if (!id) {
      throw new Error('Missing required route param: userId');
    }
    return id;
  })();

  readonly user = signal<User | null>(null);
  readonly patientList = this.patientStateService.patients;

  private page = 1;
  private loading = false;
  private allPatientsLoaded = false;

  constructor() {
    this.loadPatients();

    this.authService.getUser(this.userId).subscribe({
      next: (u) => this.user.set(u),
      error: () => this.user.set(null),
    });
  }

  loadPatients(): void {
    if (this.loading || this.allPatientsLoaded) {
      return;
    }

    this.loading = true;

    this.patientService.getPatientsPage(this.page, PATIENT_PAGINATION_LIMIT).subscribe({
      next: (newPatients) => {
        if (newPatients.length < PATIENT_PAGINATION_LIMIT) {
          this.allPatientsLoaded = true;
        }
        this.patientStateService.addPatients(newPatients);
        this.page += 1;
      },
      error: (err) => console.error('Error loading patients:', err),
      complete: () => {
        this.loading = false;
      },
    });
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - SCROLL_THRESHOLD_PX) {
      this.loadPatients();
    }
  }
}
