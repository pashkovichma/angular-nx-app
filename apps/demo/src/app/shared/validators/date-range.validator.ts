import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { getMaxBirthdate, getMinBirthdate } from '../constants/constants';

export function dateRangeValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const startRaw = group.get('startDate')?.value;
    const endRaw = group.get('endDate')?.value;

    if (!startRaw || !endRaw) {
      return null;
    }

    const start = startRaw instanceof Date ? startRaw : new Date(startRaw);
    const end = endRaw instanceof Date ? endRaw : new Date(endRaw);

    return start > end ? { invalidDateRange: true } : null;
  };
}

export function birthdateValidator(): ValidatorFn {
  const maxDate = getMaxBirthdate();
  const minDate = getMinBirthdate();

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (date > maxDate) {
      return { futureDate: true };
    }

    if (date < minDate) {
      return { tooOld: true };
    }

    return null;
  };
}
