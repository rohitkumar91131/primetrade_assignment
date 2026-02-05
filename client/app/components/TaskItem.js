"use client";

import { useContext } from 'react';
import { Trash2 } from "lucide-react";
import AuthContext from '../context/AuthContext';
import TaskContext from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { user } = useContext(AuthContext);
  const { deleteTask } = useContext(TaskContext);

  const canDelete = user && (user.role === 'ADMIN' || user._id === task.user);

  return (
    <li className="group relative flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-start sm:justify-between animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="font-semibold text-gray-900">{task.title}</h3>
        {task.description && (
          <p className="mt-1 text-sm text-gray-500 leading-relaxed">{task.description}</p>
        )}
      </div>

      {canDelete && (
        <button 
          onClick={() => deleteTask(task._id)} 
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 opacity-100 transition-all hover:bg-red-50 hover:text-red-600 sm:static sm:opacity-0 sm:group-hover:opacity-100"
          title="Delete Task"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </li>
  );
};

export default TaskItem;