import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { EMAIL_PATTERN } from './patterns';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();
    if (!value) {
      return null;
    }
    return EMAIL_PATTERN.test(value) ? null : { email: true };
  };
}
