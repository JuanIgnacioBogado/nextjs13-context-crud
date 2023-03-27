'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useTaskContext } from '@/context/TaskContext';

export const Navbar = () => {
  const pathname = usePathname();
  const { totalTasks } = useTaskContext();

  return (
    <header className="flex justify-between items-center px-28 py-3 bg-gray-800 text-white">
      <div className="flex items-center gap-14">
        <Link href="/">
          <h1 className="text-3xl font-bold">Task App</h1>
        </Link>
        <span className="text-sm">Total Tasks: {totalTasks}</span>
      </div>

      <Link
        className="px-4 py-2 font-bold rounded bg-green-500 hover:bg-green-600 text-gray-50"
        href={pathname === '/' ? '/new' : '/'}
      >
        {pathname === '/' ? 'Add Task' : 'Back'}
      </Link>
    </header>
  );
};
