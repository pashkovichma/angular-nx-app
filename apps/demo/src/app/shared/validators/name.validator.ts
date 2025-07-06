import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { NAME_PATTERN } from './patterns';

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value?.trim();

    if (!value) {
      return null;
    }

    return NAME_PATTERN.test(value) ? null : { invalidName: true };
  };
}
