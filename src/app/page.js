'use client';
import { useTaskContext } from '@/context/TaskContext';
import { TaskCard } from '@/components/TaskCard';

export default function Home() {
  const { tasks } = useTaskContext();

  return (
    <div className="w-7/12 flex flex-col gap-3">
      {tasks?.map(task => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
}
