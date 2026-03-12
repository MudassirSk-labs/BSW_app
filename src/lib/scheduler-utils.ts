import { format, addDays, startOfWeek, isThursday, differenceInDays } from 'date-fns';

export interface DaySchedule {
  date: Date;
  isOff: boolean;
  isRequiredOff: boolean; // Thursdays are required off
  isManualOff: boolean;
}

export interface PayrollPeriod {
  startDate: Date;
  endDate: Date;
  workingDays: number;
}

/**
 * Backend Logic for Scheduler
 * - Week starts on Sunday
 * - 14-day payroll cycle
 * - Thursday is OFF
 * - 10 working days per cycle
 */
export const SchedulerUtils = {
  get14DayPeriod(anchorDate: Date = new Date()): DaySchedule[] {
    const start = startOfWeek(anchorDate, { weekStartsOn: 0 }); // Sunday
    const days: DaySchedule[] = [];

    for (let i = 0; i < 14; i++) {
      const date = addDays(start, i);
      const thursday = isThursday(date);
      days.push({
        date,
        isOff: thursday,
        isRequiredOff: thursday,
        isManualOff: false,
      });
    }

    return days;
  },

  calculateWorkingDays(days: DaySchedule[]): number {
    return days.filter(d => !d.isOff).length;
  },

  formatDate(date: Date): string {
    return format(date, 'EEE, MMM d');
  }
};
