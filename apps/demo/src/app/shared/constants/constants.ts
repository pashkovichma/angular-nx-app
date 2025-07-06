export const MAX_AGE = 120;
export const MAX_NOTES_LENGTH = 250;
export const PATIENT_PAGINATION_LIMIT = 30;
export const SCROLL_THRESHOLD_PX = 150;

export function getMaxBirthdate(): Date {
  return new Date();
}

export function getMinBirthdate(): Date {
  const today = getMaxBirthdate();
  return new Date(today.getFullYear() - MAX_AGE, today.getMonth(), today.getDate());
}
