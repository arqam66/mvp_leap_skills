export function getFutureDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export interface DateOption {
  dayOfWeek: string;
  dateNum: string;
  txt: string;
  value: string;
}

export function getDateOptions(): DateOption[] {
  const startOffset = 2;
  const offsets = [startOffset, startOffset + 1, startOffset + 3];
  return offsets.map((days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return {
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: date.getDate().toString(),
      txt: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      value,
    };
  });
}
