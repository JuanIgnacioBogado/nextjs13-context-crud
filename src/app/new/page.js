'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { useTaskContext } from '@/context/TaskContext';

function NewPage({ params: { id } }) {
  const { push } = useRouter();
  const { tasksLoaded, createTask, getTask, updateTask } = useTaskContext();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const onSubmit = handleSubmit(data => {
    console.log('data', data);

    id ? updateTask({ id, ...data }) : createTask(data);
    push('/');
  });

  const showError = field =>
    errors[field] && <span className="text-red-400">This field is required</span>;

  const setTask = ({ title, description }) => {
    setValue('title', title);
    setValue('description', description);
  };

  useEffect(() => {
    if (id && tasksLoaded) {
      const task = getTask(id);

      task ? setTask(task) : push('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, tasksLoaded]);

  if (id && !tasksLoaded) return <div className="font-bold text-4xl">Loading...</div>;

  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-144px)]">
      <form
        className="min-w-[300px] max-w-[450px] w-full p-8 flex flex-col gap-4 bg-gray-700"
        onSubmit={onSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-4">{id ? 'Edit Task' : 'New Task'}</h2>

        <input
          className="py-3 px-4 focus:outline-none rounded bg-gray-800"
          placeholder="Write a title"
          {...register('title', {
            required: 'ingrese texto',
            validate: value => !!value.trim()
          })}
        />
        {showError('title')}

        <textarea
          className="py-4 px-4 focus:outline-none rounded bg-gray-800 resize-none"
          placeholder="Write a description"
          {...register('description', {
            required: true,
            validate: value => !!value.trim()
          })}
        />
        {showError('description')}

        <button
          className="p-3 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={Object.keys(errors).length}
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default NewPage;
