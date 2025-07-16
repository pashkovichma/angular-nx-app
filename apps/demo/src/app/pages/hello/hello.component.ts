import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '@translate';

import { AppRoutes } from '../../app.routes';
import { PatientCardComponent } from '../../components/patient-card/patient-card.component';
import { LoaderService } from '../../services/loader.service';
import { PatientStateService } from '../../services/patient-state.service';
import { Patient, PatientService } from '../../services/patient.service';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelloComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly patientService = inject(PatientService);
  private readonly patientStateService = inject(PatientStateService);

  protected readonly loaderService = inject(LoaderService);
  protected readonly userId: string;
  protected readonly AppRoutes = AppRoutes;
  protected readonly PatientRoutes = PatientRoutes;

  readonly user = signal<User | null>(null);
  readonly userSig = toSignal(this.authService.user$, { initialValue: null });
  readonly patientList: Signal<Patient[]> = this.patientStateService.patients;

  private readonly paginationData = {
    pageSize: PATIENT_PAGINATION_LIMIT,
    page: 1,
  };

  private allPatientsLoaded = false;

  constructor() {
    const id = this.route.snapshot.paramMap.get('userId');
    if (!id) {
      throw new Error('Missing required route param: userId');
    }
    this.userId = id;

    this.loadPatients();
  }

  loadPatients(): void {
    if (this.allPatientsLoaded) {
      return;
    }

    this.patientService.getPatientsPage(this.paginationData.page, this.paginationData.pageSize).subscribe({
      next: (newPatients) => {
        if (newPatients.length < this.paginationData.pageSize) {
          this.allPatientsLoaded = true;
        }
        this.patientStateService.addPatients(newPatients);
        this.paginationData.page += 1;
      },
      error: (err) => {
        console.error('Error loading patients:', err);
      },
    });
  }

  logout(): void {
    this.authService.logout({
      logoutParams: {
        returnTo: window.location.origin,
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
