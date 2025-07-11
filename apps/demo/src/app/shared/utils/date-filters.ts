export function createBirthdateFilter(min: Date, max: Date): (date: Date | null) => boolean {
  return (date: Date | null) => !!date && date >= min && date <= max;
}

export function createStartDateFilter(getEndDate: () => Date | null): (date: Date | null) => boolean {
  return (date: Date | null) => {
    const end = getEndDate();
    return !date || !end || date <= end;
  };
}

export function createEndDateFilter(getStartDate: () => Date | null): (date: Date | null) => boolean {
  return (date: Date | null) => {
    const start = getStartDate();
    return !date || !start || date >= start;
  };
}
