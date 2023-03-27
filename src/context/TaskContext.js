'use client';
import { createContext, useContext, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { useLocalStorage } from '@/hooks/useLocalStorage';

const showToast = msg => toast.success(`Task ${msg} successfully`);

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { tasks, setTasks, tasksLoaded } = useLocalStorage('tasks', []);

  const totalTasks = useMemo(() => tasks.length, [tasks]);

  const createTask = task => {
    setTasks(tasks => [...tasks, { id: crypto.randomUUID(), ...task }]);
    showToast('created');
  };

  const deleteTask = taskId => {
    setTasks(tasks => tasks.filter(({ id }) => id !== taskId));
    showToast('deleted');
  };

  const getTask = taskId => tasks.find(({ id }) => id === taskId);

  const updateTask = task => {
    setTasks(tasks => tasks.map(t => (t.id === task.id ? task : t)));
    showToast('updated');
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        tasksLoaded,
        totalTasks,
        createTask,
        deleteTask,
        getTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
