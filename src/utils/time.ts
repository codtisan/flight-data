import * as dayjs from 'dayjs';

export class Time {
  constructor() {}

  public static getCurrentTime(): string {
    const currentTime = dayjs().format();
    return currentTime;
  }

  public static getRestDayNumberInMonth(): number {
    const numberOfDays = dayjs().daysInMonth();
    const currentTime = dayjs().get('date');
    const numberOfRestDays = numberOfDays - currentTime + 1;
    return numberOfRestDays;
  }

  public static getCurrentAndNextMonth(): [string, string] {
    const currentMonth = dayjs();
    const nextMonth = currentMonth.add(1, 'month');
    return [currentMonth.format('MMMM'), nextMonth.format('MMMM')];
  }
}
