'use client';

import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, UserPlus, Search, Filter } from 'lucide-react';
import { Employee } from '@/types/employee';
import { Input } from '@/components/ui/input';

interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (ids: string[]) => void;
  onAddClick: () => void;
}

export function EmployeeTable({ employees, onDelete, onAddClick }: EmployeeTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredEmployees.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredEmployees.map(e => e.id)));
    }
  };

  const toggleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleBulkDelete = () => {
    onDelete(Array.from(selectedIds));
    setSelectedIds(new Set());
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Manager': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'Assistant Manager': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Security': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input 
            placeholder="Search employees..." 
            className="pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.size > 0 && (
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleBulkDelete}
              className="animate-in fade-in slide-in-from-right-2 duration-200"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete ({selectedIds.size})
            </Button>
          )}
          <Button 
            onClick={onAddClick}
            size="sm"
            className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <TableHead className="w-12 h-12">
                <Checkbox 
                  checked={selectedIds.size === filteredEmployees.length && filteredEmployees.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="font-semibold text-zinc-900 dark:text-zinc-50">Name</TableHead>
              <TableHead className="font-semibold text-zinc-900 dark:text-zinc-50">Role</TableHead>
              <TableHead className="font-semibold text-zinc-900 dark:text-zinc-50">Contact info</TableHead>
              <TableHead className="text-right font-semibold text-zinc-900 dark:text-zinc-50">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-zinc-500 italic">
                  No employees found
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((emp) => (
                <TableRow key={emp.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                  <TableCell>
                    <Checkbox 
                      checked={selectedIds.has(emp.id)}
                      onCheckedChange={() => toggleSelectOne(emp.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">{emp.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("font-medium border-none", getRoleBadgeColor(emp.role))}>
                      {emp.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="text-zinc-900 dark:text-zinc-300">{emp.email}</div>
                      <div className="text-zinc-500 text-xs">{emp.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-zinc-400 hover:text-red-600 transition-colors"
                      onClick={() => onDelete([emp.id])}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
