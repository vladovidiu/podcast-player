export enum WeekDayEnum {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export const getWeekDay = (date: Date): WeekDayEnum => {
  const day = date.getDay();

  const lookups = {
    [WeekDayEnum.Monday]: 1,
    [WeekDayEnum.Tuesday]: 2,
    [WeekDayEnum.Wednesday]: 3,
    [WeekDayEnum.Thursday]: 4,
    [WeekDayEnum.Friday]: 5,
    [WeekDayEnum.Saturday]: 6,
    [WeekDayEnum.Sunday]: 0,
  };

  for (const key in lookups) {
    if (lookups[key as keyof typeof lookups] === day) {
      return key as keyof typeof lookups;
    }
  }

  throw new Error('Invalid date');
};

export const humanReadableDuration = (duration: string): string => {
  const [h, m, s] = duration.split(':');

  if (h === '00') {
    return `${Number(m)}min`;
  }

  if (!s) {
    return `${Number(h)}min. ${Number(m)}sec`;
  }

  return `${Number(h)}hrs. ${m}min`;
};
