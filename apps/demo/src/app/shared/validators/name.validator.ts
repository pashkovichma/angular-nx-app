import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { NAME_PATTERN } from './patterns';

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value?.trim();

    if (!value) {
      return null;
    }

    const errors: ValidationErrors = {};

    if (value.length < 2) {
      errors['minlength'] = {
        requiredLength: 2,
        actualLength: value.length,
      };
    }

    if (!NAME_PATTERN.test(value)) {
      errors['invalidName'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}
