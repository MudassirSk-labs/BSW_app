'use client';

import { format, addDays, startOfWeek, isThursday } from 'date-fns';
import { supabase } from '@/lib/supabase';

export interface DaySchedule {
  id?: string;
  employee_id: string;
  day_date: Date | string;
  is_off: boolean;
  is_required_off: boolean;
  is_manual_off: boolean;
}

export const SchedulerUtils = {
  get14DayPeriod(employeeId: string, anchorDate: Date = new Date()): DaySchedule[] {
    const start = startOfWeek(anchorDate, { weekStartsOn: 0 }); // Sunday
    const days: DaySchedule[] = [];

    for (let i = 0; i < 14; i++) {
      const date = addDays(start, i);
      const thursday = isThursday(date);
      days.push({
        employee_id: employeeId,
        day_date: format(date, 'yyyy-MM-dd'),
        is_off: thursday,
        is_required_off: thursday,
        is_manual_off: false,
      });
    }

    return days;
  },

  async fetchSchedule(employeeIds: string[]): Promise<DaySchedule[]> {
    const { data, error } = await supabase
      .from('schedule')
      .select('*')
      .in('employee_id', employeeIds);

    if (error) throw error;
    return data || [];
  },

  async saveSchedule(days: DaySchedule[]): Promise<void> {
    const { error } = await supabase
      .from('schedule')
      .upsert(days, { onConflict: 'employee_id,day_date' });

    if (error) throw error;
  },

  calculateWorkingDays(days: DaySchedule[]): number {
    return days.filter(d => !d.is_off).length;
  },

  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return format(d, 'EEE, MMM d');
  }
};
