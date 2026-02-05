"use client";

import { createContext, useState, useContext, useCallback } from 'react';
import api from '../lib/api';
import AuthContext from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const createTask = async (title, description) => {
    try {
      const { data } = await api.post('/tasks', { title, description });
      setTasks((prev) => [...prev, data]);
      return true;
    } catch (error) {
      alert('Error creating task');
      return false;
    }
  };

  const deleteTask = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      alert("Failed to delete (Unauthorized)");
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, isLoading, fetchTasks, createTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;