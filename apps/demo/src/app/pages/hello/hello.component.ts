import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '@translate';

import { PatientCardComponent } from '../../components/patient-card/patient-card.component';
import { AuthService } from '../../services/auth.service';
import { PatientService } from '../../services/patient.service';
import { patients, setPatients } from '../../services/patient.signal';
import type { User } from '../../services/user.model';

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

  readonly userId: string;
  readonly user = signal<User | null>(null);
  readonly patientList = patients;

  constructor() {
    const id = this.route.snapshot.paramMap.get('userId');
    if (!id) {
      throw new Error('Missing required route param: userId');
    }
    this.userId = id;

    this.authService.getUser(this.userId).subscribe({
      next: (u) => this.user.set(u),
      error: () => this.user.set(null),
    });

    this.patientService.getPatients().subscribe({
      next: (list) => setPatients(list),
    });
  }
}
