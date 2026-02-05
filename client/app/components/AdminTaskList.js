"use client";

import TaskItem from './TaskItem';
import { Users } from "lucide-react";

const AdminTaskList = ({ tasks }) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    const userId = typeof task.user === 'object' ? task.user._id : task.user;
    const userName = typeof task.user === 'object' ? task.user.name : `User ID: ${userId}`;
    const userEmail = typeof task.user === 'object' ? task.user.email : '';

    if (!acc[userId]) {
      acc[userId] = {
        name: userName,
        email: userEmail,
        tasks: []
      };
    }
    acc[userId].tasks.push(task);
    return acc;
  }, {});

  const usersArray = Object.values(groupedTasks);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800">
        <Users className="h-5 w-5" />
        <span className="font-medium">Admin View: Grouped by Users</span>
      </div>

      {usersArray.map((group, index) => (
        <div key={index} className="space-y-3">
          <div className="sticky top-[80px] z-10 bg-gray-50/95 backdrop-blur-sm py-2 px-1 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              {group.name}
              <span className="text-xs font-normal text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                {group.tasks.length} Tasks
              </span>
            </h3>
            {group.email && <p className="text-xs text-gray-500">{group.email}</p>}
          </div>

          <ul className="space-y-3 pl-2 sm:pl-4 border-l-2 border-gray-200">
            {group.tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminTaskList;