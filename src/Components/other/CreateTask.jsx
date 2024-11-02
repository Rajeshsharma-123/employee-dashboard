import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const CreateTask = () => {
    const [userData, setUserData] = useContext(AuthContext);

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [category, setCategory] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        // Create the new task object
        const newTask = {
            taskTitle,
            taskDescription,
            taskDate,
            category,
            active: false,
            newTask: true,
            failed: false,
            completed: false
        };

        // Create a copy of userData to avoid mutating the state directly
        const updatedUserData = [...userData];

        // Find the employee by name and add the task
        const employee = updatedUserData.find((elem) => elem.firstName === assignTo);

        if (employee) {
            // Add the new task to the employee's tasks array
            employee.tasks.push(newTask);

            // Update the task count for new tasks
            employee.taskCounts.newTask += 1;

            // Update the global user data state
            setUserData(updatedUserData);

            // Clear form fields
            setTaskTitle('');
            setCategory('');
            setAssignTo('');
            setTaskDate('');
            setTaskDescription('');
        } else {
            alert("Employee not found. Please enter a valid employee name.");
        }
    };

    return (
        <div className='p-5 bg-slate-200 mt-5 rounded'>
            <form onSubmit={submitHandler} className='flex flex-wrap w-full items-start justify-between'>
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-black mb-0.5'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-black placeholder:text-black'
                            type="text"
                            placeholder='Make a UI design'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-black mb-0.5'>Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 text-black mb-4'
                            type="date"
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-black mb-0.5'>Assign to</h3>
                        <input
                            value={assignTo}
                            onChange={(e) => setAssignTo(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-black placeholder:text-black'
                            type="text"
                            placeholder='Employee name'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-black mb-0.5'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-black placeholder:text-black'
                            type="text"
                            placeholder='design, dev, etc'
                        />
                    </div>
                </div>

                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-black mb-0.5'>Description</h3>
                    <textarea
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400 text-black placeholder:text-black'
                        placeholder='Task description'
                    />
                    <button className='bg-purple-600 py-3 hover:bg-purple-800 px-5 rounded text-sm mt-4 w-full'>
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;
