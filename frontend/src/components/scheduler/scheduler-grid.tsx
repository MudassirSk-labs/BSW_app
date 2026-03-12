'use client';

import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Employee } from '@/types/employee';
import { SchedulerUtils, DaySchedule } from '@/lib/scheduler-utils';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Save, Info, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface SchedulerGridProps {
  employees: Employee[];
}

export function SchedulerGrid({ employees }: SchedulerGridProps) {
  const [scheduleData, setScheduleData] = useState<Record<string, DaySchedule[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadSchedule() {
      setIsLoading(true);
      try {
        const empIds = employees.map(e => e.id);
        const existingDays = await SchedulerUtils.fetchSchedule(empIds);
        
        const initial: Record<string, DaySchedule[]> = {};
        employees.forEach(emp => {
          const defaultDays = SchedulerUtils.get14DayPeriod(emp.id);
          // Merge existing days into default days
          initial[emp.id] = defaultDays.map(d => {
            const saved = existingDays.find(
              s => s.employee_id === emp.id && 
              (typeof s.day_date === 'string' ? s.day_date : s.day_date.toISOString().split('T')[0]) === d.day_date
            );
            return saved ? { ...d, ...saved } : d;
          });
        });
        setScheduleData(initial);
      } catch (error) {
        toast.error('Failed to load schedule data');
      } finally {
        setIsLoading(false);
      }
    }

    if (employees.length > 0) {
      loadSchedule();
    } else {
      setIsLoading(false);
    }
  }, [employees]);

  const toggleDay = (empId: string, dayIndex: number) => {
    const next = { ...scheduleData };
    const empDays = [...next[empId]];
    const day = { ...empDays[dayIndex] };

    if (day.is_required_off) return;

    day.is_manual_off = !day.is_manual_off;
    day.is_off = day.is_manual_off;
    empDays[dayIndex] = day;
    next[empId] = empDays;
    setScheduleData(next);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const allDays = Object.values(scheduleData).flat();
      await SchedulerUtils.saveSchedule(allDays);
      toast.success('Schedule saved to Supabase');
    } catch (error) {
      toast.error('Failed to save schedule');
    } finally {
      setIsSaving(false);
    }
  };

  const daysHeader = employees.length > 0 ? SchedulerUtils.get14DayPeriod(employees[0].id) : [];

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-zinc-900 dark:bg-zinc-50 rounded-lg">
            <CalendarIcon className="w-5 h-5 text-zinc-50 dark:text-zinc-900" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Payroll Period: 14 Days</h3>
            <p className="text-xs text-zinc-500">
              Current cycle coverage management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="hidden md:flex bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900">
            <Info className="w-3 h-3 mr-1" />
            Thursdays Locked
          </Badge>
          <Button onClick={handleSave} disabled={isSaving} className="bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save to DB
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-x-auto shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <TableHead className="w-48 sticky left-0 bg-zinc-50 dark:bg-zinc-900 z-10 border-r border-zinc-200 dark:border-zinc-800 font-bold">Employee</TableHead>
              {daysHeader.map((d, i) => (
                <TableHead key={i} className={cn(
                  "text-center min-w-[80px] text-xs font-semibold",
                  d.is_required_off ? "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400" : "text-zinc-900 dark:text-zinc-50"
                )}>
                  {SchedulerUtils.formatDate(d.day_date).split(',')[0]}
                  <br />
                  <span className="text-[10px] opacity-70">{SchedulerUtils.formatDate(d.day_date).split(',')[1]}</span>
                </TableHead>
              ))}
              <TableHead className="text-right font-bold bg-zinc-50 dark:bg-zinc-900 sticky right-0 z-10 border-l border-zinc-200 dark:border-zinc-800">Working</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp) => {
              const empSchedule = scheduleData[emp.id] || [];
              const workingDays = SchedulerUtils.calculateWorkingDays(empSchedule);
              
              return (
                <TableRow key={emp.id} className="hover:bg-zinc-50/30 dark:hover:bg-zinc-900/30 transition-colors">
                  <TableCell className="sticky left-0 bg-white dark:bg-zinc-950 z-10 border-r border-zinc-200 dark:border-zinc-800">
                    <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-[150px]">{emp.name}</div>
                    <div className="text-[10px] text-zinc-500 truncate">{emp.role}</div>
                  </TableCell>
                  {empSchedule.map((day, i) => (
                    <TableCell key={i} className={cn(
                      "p-0 text-center border-r border-zinc-100 dark:border-zinc-900 last:border-0",
                      day.is_required_off && "bg-zinc-50/50 dark:bg-zinc-900/20"
                    )}>
                      <button
                        onClick={() => toggleDay(emp.id, i)}
                        disabled={day.is_required_off}
                        className={cn(
                          "w-full h-12 flex items-center justify-center transition-all duration-200",
                          day.is_required_off ? "cursor-not-allowed" : "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                          day.is_off ? "bg-red-50 dark:bg-red-950/10" : "bg-emerald-50/30 dark:bg-emerald-950/10"
                        )}
                      >
                        {day.is_off ? (
                          <Badge variant="outline" className="text-[10px] bg-red-100 text-red-700 border-none px-1 h-5 dark:bg-red-900/30 dark:text-red-400">OFF</Badge>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        )}
                      </button>
                    </TableCell>
                  ))}
                  <TableCell className="text-right font-bold text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-950 sticky right-0 z-10 border-l border-zinc-200 dark:border-zinc-800">
                    <span className={cn(
                      "px-2 py-1 rounded-md text-sm",
                      workingDays === 10 ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" : "text-zinc-600 bg-zinc-50 dark:bg-zinc-900"
                    )}>
                      {workingDays}/14
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
