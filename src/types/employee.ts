
export type EmployeeRole = 
  | 'Manager' 
  | 'Assistant Manager' 
  | 'Floor Helper' 
  | 'Warehouse Helper' 
  | 'Furniture Helper' 
  | 'Office Helper' 
  | 'Security';

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  createdAt: string;
}

export const ROLES: EmployeeRole[] = [
  'Manager',
  'Assistant Manager',
  'Floor Helper',
  'Warehouse Helper',
  'Furniture Helper',
  'Office Helper',
  'Security'
];
