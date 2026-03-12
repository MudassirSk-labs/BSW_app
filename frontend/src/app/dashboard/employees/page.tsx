'use client';

import { useState, useEffect } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { EmployeeTable } from '@/components/employees/employee-table';
import { AddEmployeeForm } from '@/components/employees/add-employee-form';
import { EmployeeService } from '@/services/employee-service';
import { Employee } from '@/types/employee';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    setIsLoading(true);
    try {
      const data = await EmployeeService.getAll();
      setEmployees(data);
    } catch (error) {
      toast.error('Failed to load employees');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddEmployee(data: any) {
    try {
      await EmployeeService.add(data);
      await loadEmployees();
      setIsAddModalOpen(false);
      toast.success('Employee added successfully');
    } catch (error) {
      toast.error('Failed to add employee');
    }
  }

  async function handleDeleteEmployees(ids: string[]) {
    try {
      await EmployeeService.deleteMany(ids);
      await loadEmployees();
      toast.success(`Deleted ${ids.length} employee(s)`);
    } catch (error) {
      toast.error('Failed to delete employees');
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Employees</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Manage your workforce, add new staff, and assign roles.
          </p>
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-zinc-100"></div>
          </div>
        ) : (
          <EmployeeTable 
            employees={employees} 
            onDelete={handleDeleteEmployees} 
            onAddClick={() => setIsAddModalOpen(true)}
          />
        )}

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Add New Employee</DialogTitle>
            </DialogHeader>
            <AddEmployeeForm onSubmit={handleAddEmployee} />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardShell>
  );
}
