import { supabase } from '@/lib/supabase';
import { Employee } from '@/types/employee';

/**
 * Backend Service Layer for Employee Management
 * Refactored to use Supabase for persistent data.
 */
export const EmployeeService = {
  async getAll(): Promise<Employee[]> {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Employee[];
  },

  async add(employee: Omit<Employee, 'id' | 'createdAt'>): Promise<Employee> {
    const { data, error } = await supabase
      .from('employees')
      .insert([
        {
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          role: employee.role,
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data as Employee;
  },

  async deleteMany(ids: string[]): Promise<void> {
    const { error } = await supabase
      .from('employees')
      .delete()
      .in('id', ids);

    if (error) throw error;
  }
};
