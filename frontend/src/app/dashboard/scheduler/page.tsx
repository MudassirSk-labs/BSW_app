'use client';

import { useState, useEffect } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { SchedulerGrid } from '@/components/scheduler/scheduler-grid';
import { EmployeeService } from '@/services/employee-service';
import { Employee } from '@/types/employee';
import { toast } from 'sonner';

export default function SchedulerPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadEmployees() {
      try {
        const data = await EmployeeService.getAll();
        setEmployees(data);
      } catch (error) {
        toast.error('Failed to load employees for scheduling');
      } finally {
        setIsLoading(false);
      }
    }
    loadEmployees();
  }, []);

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Scheduler</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            View payroll periods, track working days, and manage employee leave.
          </p>
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-zinc-100"></div>
          </div>
        ) : (
          <SchedulerGrid employees={employees} />
        )}
      </div>
    </DashboardShell>
  );
}
