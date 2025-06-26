import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-error',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, TranslateModule],
  templateUrl: './form-field-error.component.html',
})
export class FormFieldErrorComponent {
  @Input({ required: true }) control!: AbstractControl | null;
}
