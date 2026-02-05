"use client";

import { useEffect, useContext } from 'react';
import { CheckCircle2 } from "lucide-react";
import AuthContext from '../context/AuthContext'; // Import AuthContext
import TaskContext from '../context/TaskContext';
import TaskItem from './TaskItem';
import TaskSkeleton from './TaskSkeleton';
import AdminTaskList from './AdminTaskList'; // Import the new component

const TaskList = () => {
  const { user } = useContext(AuthContext); // Get current user role
  const { tasks, isLoading, fetchTasks } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-6 w-16 animate-pulse rounded-full bg-gray-100"></div>
        </div>
        <TaskSkeleton />
      </div>
    );
  }

  // --- Empty State ---
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-4 rounded-full bg-gray-50 p-4">
          <CheckCircle2 className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No tasks yet</h3>
        <p className="mt-1 text-gray-500">
            {user?.role === 'ADMIN' ? 'No users have created tasks yet.' : 'Create your first task to get started.'}
        </p>
      </div>
    );
  }

  // --- ADMIN VIEW ---
  if (user && user.role === 'ADMIN') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">All User Tasks</h2>
            <span className="rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs font-medium">
            {tasks.length} Total
            </span>
        </div>
        {/* Render the specialized Admin List */}
        <AdminTaskList tasks={tasks} />
      </div>
    );
  }

  // --- USER VIEW (Standard) ---
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {tasks.length} Total
        </span>
      </div>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;