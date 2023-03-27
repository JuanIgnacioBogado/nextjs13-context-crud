import { useRouter } from 'next/navigation';

import { useTaskContext } from '@/context/TaskContext';

export const TaskCard = ({ id, title, description }) => {
  const { deleteTask } = useTaskContext();
  const { push } = useRouter();

  const handleDelete = async e => {
    e.stopPropagation();
    window.confirm('Are you sure to delete it') && deleteTask(id);
  };

  return (
    <div
      className="cursor-pointer px-10 py-8 flex flex-col rounded bg-gray-700 hover:bg-slate-600 gap-3"
      onClick={() => push(`/edit/${id}`)}
    >
      <div className="flex justify-between">
        <h1>{title}</h1>
        <button className="px-4 py-2 rounded bg-red-500 hover:bg-red-400" onClick={handleDelete}>
          Delete
        </button>
      </div>

      <p>{description}</p>
      <span className="text-gray-400 text-xs">{id}</span>
    </div>
  );
};
