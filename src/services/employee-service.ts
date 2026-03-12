import { Employee, ROLES } from '@/types/employee';

// Mock DB in memory for now
let employees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-0101',
    role: 'Manager',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-0102',
    role: 'Floor Helper',
    createdAt: new Date().toISOString(),
  }
];

/**
 * Backend Service Layer for Employee Management
 * This can be refactored to call an external API or Database
 */
export const EmployeeService = {
  async getAll(): Promise<Employee[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...employees];
  },

  async add(employee: Omit<Employee, 'id' | 'createdAt'>): Promise<Employee> {
    const newEmployee: Employee = {
      ...employee,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
    };
    employees = [newEmployee, ...employees];
    return newEmployee;
  },

  async deleteMany(ids: string[]): Promise<void> {
    employees = employees.filter(emp => !ids.includes(emp.id));
  }
};
