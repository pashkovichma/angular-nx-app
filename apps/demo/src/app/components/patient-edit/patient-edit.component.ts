import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOption, MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PatientService, type Patient } from '../../services/patient.service';
import { updatePatientInList } from '../../services/patient.signal';
import { getMaxBirthdate, getMinBirthdate, MAX_NOTES_LENGTH } from '../../shared/constants/constants';
import { createBirthdateFilter, createEndDateFilter, createStartDateFilter } from '../../shared/utils/date-filters';
import { birthdateValidator, dateRangeValidator } from '../../shared/validators/date-range.validator';
import { emailValidator } from '../../shared/validators/email.validator';
import { nameValidator } from '../../shared/validators/name.validator';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormFieldErrorComponent,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatOption,
    MatProgressSpinnerModule,
    MatSelect,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss'],
})
export class PatientEditComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly patientService = inject(PatientService);
  private readonly fb = inject(FormBuilder);

  private readonly patientId = this.route.snapshot.paramMap.get('patientId') ?? '';
  readonly userId = this.route.parent?.snapshot.paramMap.get('userId') ?? '';
  readonly patient = signal<Patient | null>(null);

  readonly form: FormGroup = this.fb.group(
    {
      firstName: ['', [Validators.required, nameValidator()]],
      lastName: ['', [Validators.required, nameValidator()]],
      email: ['', [Validators.required, emailValidator()]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      birthdate: [null, birthdateValidator()],
      startDate: [null],
      endDate: [null],
      newsletter: [false],
      notes: ['', Validators.maxLength(MAX_NOTES_LENGTH)],
    },
    { validators: dateRangeValidator() },
  );

  readonly isLoaded = computed(() => this.patient() !== null);

  readonly maxBirthdate = getMaxBirthdate();
  readonly minBirthdate = getMinBirthdate();

  readonly birthdateFilter = createBirthdateFilter(this.minBirthdate, this.maxBirthdate);
  readonly startDateFilter = createStartDateFilter(() => this.form.get('endDate')?.value);
  readonly endDateFilter = createEndDateFilter(() => this.form.get('startDate')?.value);

  constructor() {
    this.patientService.getPatient(this.patientId).subscribe({
      next: (p) => {
        this.patient.set(p);
        this.patchForm(p);
      },
      error: () => this.router.navigate(['/not-found']),
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.patientService.updatePatient(this.patientId, this.form.value).subscribe({
      next: (updatedPatient) => {
        updatePatientInList(updatedPatient);
        this.router.navigate(['/hello', this.userId]);
      },
      error: (err) => console.error('Error updating patient:', err),
    });
  }

  cancel(): void {
    this.router.navigate(['/hello', this.userId]);
  }

  private patchForm(p: Patient): void {
    this.form.patchValue({
      ...p,
      birthdate: p.birthdate ? new Date(p.birthdate) : null,
      startDate: p.startDate ? new Date(p.startDate) : null,
      endDate: p.endDate ? new Date(p.endDate) : null,
    });
  }

  private toDateInputFormat(dateString?: string): string | null {
    if (!dateString) {
      return null;
    }

    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
}
