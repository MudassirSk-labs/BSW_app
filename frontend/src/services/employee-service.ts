import { Employee } from '@/types/employee';

const BACKEND_URL = 'http://127.0.0.1:5001/api';

/**
 * Backend Service Layer for Employee Management
 * Proxied via Node.js Backend API
 */
export const EmployeeService = {
  async getAll(): Promise<Employee[]> {
    const response = await fetch(`${BACKEND_URL}/employees`);
    if (!response.ok) throw new Error('Failed to fetch employees');
    return await response.json();
  },

  async add(employee: Omit<Employee, 'id' | 'createdAt'>): Promise<Employee> {
    const response = await fetch(`${BACKEND_URL}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    });

    if (!response.ok) throw new Error('Failed to add employee');
    return await response.json();
  },

  async deleteMany(ids: string[]): Promise<void> {
    const response = await fetch(`${BACKEND_URL}/employees`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) throw new Error('Failed to delete employees');
  }
};
