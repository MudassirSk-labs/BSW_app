'use client';

import { Sidebar } from './sidebar';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <h1 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Overview / Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">AD</span>
              </div>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Administrator</span>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
