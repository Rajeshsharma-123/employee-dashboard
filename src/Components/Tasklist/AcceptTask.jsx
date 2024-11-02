import React, { useState, useEffect } from 'react';

const AcceptTask = ({ data }) => {
  const [taskStatus, setTaskStatus] = useState(data.status || 'Pending'); // Initialize with "Pending" or existing status

  // Update task status in local storage
  const updateTaskStatus = (newStatus) => {
    setTaskStatus(newStatus); // Update state locally
    const storedTasks = JSON.parse(localStorage.getItem(`tasks_${data.employeeEmail}`)) || [];

    const updatedTasks = storedTasks.map((task) =>
      task.taskTitle === data.taskTitle ? { ...task, status: newStatus } : task
    );

    // Update local storage with new status
    localStorage.setItem(`tasks_${data.employeeEmail}`, JSON.stringify(updatedTasks));
  };

  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl'>
      <div className='flex justify-between items-center'>
        <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
        <h4 className='text-sm'>{data.taskDate}</h4>
      </div>
      <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
      <p className='text-sm mt-2'>{data.taskDescription}</p>
      <div className='flex justify-between mt-6'>
        {taskStatus === 'Pending' && (
          <>
            <button
              className='bg-green-500 rounded font-medium py-1 px-2 text-xs'
              onClick={() => updateTaskStatus('Completed')}
            >
              Mark as Completed
            </button>
            <button
              className='bg-red-500 rounded font-medium py-1 px-2 text-xs'
              onClick={() => updateTaskStatus('Failed')}
            >
              Mark as Failed
            </button>
          </>
        )}
        {taskStatus !== 'Pending' && <p className="text-xs font-medium">{`Task ${taskStatus}`}</p>}
      </div>
    </div>
  );
};

export default AcceptTask;
