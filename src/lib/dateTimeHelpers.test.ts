import {
  getWeekDay,
  WeekDayEnum,
  humanReadableDuration,
} from './dateTimeHelpers';

describe('dateTimeHelpers', () => {
  describe('#getWeekDay', () => {
    test.each`
      date                                    | expected
      ${new Date('2020-07-17T14:58:48.268Z')} | ${WeekDayEnum.Friday}
      ${new Date('2020-07-18T14:58:48.268Z')} | ${WeekDayEnum.Saturday}
      ${new Date('2020-07-19T14:58:48.268Z')} | ${WeekDayEnum.Sunday}
      ${new Date('2020-07-20T14:58:48.268Z')} | ${WeekDayEnum.Monday}
      ${new Date('2020-07-21T14:58:48.268Z')} | ${WeekDayEnum.Tuesday}
      ${new Date('2020-07-22T14:58:48.268Z')} | ${WeekDayEnum.Wednesday}
      ${new Date('2020-07-23T14:58:48.268Z')} | ${WeekDayEnum.Thursday}
    `('should return $expected for the given $date', ({date, expected}) => {
      expect(getWeekDay(date)).toBe(expected);
    });
  });

  describe('#humanDuration', () => {
    test.each`
      duration      | expected
      ${'03:13:00'} | ${'3hrs. 13min'}
      ${'12:13:00'} | ${'12hrs. 13min'}
      ${'02:00:00'} | ${'2hrs. 00min'}
    `(
      'should return $expected for the given $duration',
      ({duration, expected}) => {
        expect(humanReadableDuration(duration)).toBe(expected);
      },
    );

    it('should return a human readable duration', () => {
      expect(humanReadableDuration('03:13:00')).toBe('3hrs. 13min');
    });
  });
});
