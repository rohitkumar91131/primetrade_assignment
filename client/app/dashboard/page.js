"use client";

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderIcon, LogOut, LayoutDashboard, Plus, X } from "lucide-react";
import AuthContext from '../context/AuthContext';
import { TaskProvider } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const DashboardContent = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 relative">
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">TaskBoard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs font-medium text-gray-500 capitalize">{user?.role}</p>
            </div>
            <div className="h-8 w-[1px] bg-gray-200 hidden sm:block"></div>
            <button 
              onClick={logout} 
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-red-50 hover:border-red-100 hover:text-red-600 active:scale-95"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
          
          <div className="hidden lg:block sticky top-24 h-fit space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Plus className="h-5 w-5 text-blue-600" />
                New Task
              </h2>
              <TaskForm />
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <h3 className="mb-2 font-semibold text-blue-900">Pro Tip</h3>
              <p className="text-sm text-blue-700">
                Admins can manage all tasks. Regular users manage only their own.
              </p>
            </div>
          </div>

          <TaskList />
          
        </div>
      </div>

      <button
        onClick={() => setIsMobileFormOpen(true)}
        className="fixed bottom-6 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-transform active:scale-90 lg:hidden"
      >
        <Plus className="h-8 w-8" />
      </button>

      {isMobileFormOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm p-4 lg:hidden animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Create New Task</h2>
              <button 
                onClick={() => setIsMobileFormOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100 text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <TaskForm onSuccess={() => setIsMobileFormOpen(false)} />
          </div>
        </div>
      )}

    </main>
  );
};

export default function Dashboard() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <LoaderIcon className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-sm font-medium text-gray-500">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <TaskProvider>
      <DashboardContent />
    </TaskProvider>
  );
}