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
import { patients, setPatients, updatePatientInList } from '../../services/patient.signal';
import { getMaxBirthdate, getMinBirthdate, MAX_NOTES_LENGTH } from '../../shared/constants/constants';
import { createBirthdateFilter, createEndDateFilter, createStartDateFilter } from '../../shared/utils/date-filters';
import { birthdateValidator, dateRangeValidator } from '../../shared/validators/date-range.validator';
import { emailValidator } from '../../shared/validators/email.validator';
import { nameValidator } from '../../shared/validators/name.validator';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatOption,
    MatProgressSpinnerModule,
    MatSelect,
    FormFieldErrorComponent,
  ],
})
export class PatientFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly patientService = inject(PatientService);

  readonly userId = this.route.parent?.snapshot.paramMap.get('userId') ?? '';
  readonly patientId = this.route.snapshot.paramMap.get('patientId');
  readonly isEditMode = !!this.patientId;

  readonly patient = signal<Patient | null>(null);
  readonly isLoaded = computed(() => !this.isEditMode || this.patient() !== null);

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

  readonly maxBirthdate = getMaxBirthdate();
  readonly minBirthdate = getMinBirthdate();
  readonly birthdateFilter = createBirthdateFilter(this.minBirthdate, this.maxBirthdate);
  readonly startDateFilter = createStartDateFilter(() => this.form.get('endDate')?.value);
  readonly endDateFilter = createEndDateFilter(() => this.form.get('startDate')?.value);

  constructor() {
    if (this.isEditMode && this.patientId) {
      this.patientService.getPatient(this.patientId).subscribe({
        next: (p) => {
          this.patient.set(p);
          this.patchForm(p);
        },
        error: () => this.router.navigate(['/not-found']),
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (this.isEditMode && this.patientId) {
      this.patientService.updatePatient(this.patientId, formValue).subscribe({
        next: (updated) => {
          updatePatientInList(updated);
          this.router.navigate(['/hello', this.userId]);
        },
        error: (err) => console.error('Update error:', err),
      });
    } else {
      this.patientService.createPatient(formValue).subscribe({
        next: (created) => {
          setPatients([...patients(), created]);
          this.router.navigate(['/hello', this.userId]);
        },
        error: (err) => console.error('Create error:', err),
      });
    }
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
}
