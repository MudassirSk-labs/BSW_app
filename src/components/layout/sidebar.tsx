'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Calendar, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { logout } from '@/lib/auth-actions';

const navItems = [
  { name: 'Employees', href: '/dashboard/employees', icon: Users },
  { name: 'Scheduler', href: '/dashboard/scheduler', icon: Calendar },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 w-64 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-50 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-zinc-50 dark:text-zinc-900" />
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">BSW Admin</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                isActive 
                  ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-50"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                isActive ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50"
              )} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <form action={logout}>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
