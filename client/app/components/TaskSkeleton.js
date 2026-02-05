const TaskSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <div 
          key={index} 
          className="flex animate-pulse flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between"
        >
          <div className="w-full space-y-3">
            <div className="h-5 w-1/3 rounded-md bg-gray-200"></div>
            
            <div className="space-y-2">
              <div className="h-3 w-3/4 rounded-md bg-gray-100"></div>
              <div className="h-3 w-1/2 rounded-md bg-gray-100"></div>
            </div>
          </div>

          <div className="hidden h-8 w-8 rounded-lg bg-gray-100 sm:block"></div>
        </div>
      ))}
    </div>
  );
};

export default TaskSkeleton;