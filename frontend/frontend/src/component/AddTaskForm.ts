// components/AddTaskForm.tsx or pages/AddTaskForm.tsx
import { useState } from 'react';

const AddTaskForm = () => {
  const [taskContent, setTaskContent] = useState(''); // Store input value

  const addTask = async () => {
    try {
      const response = await fetch('/api/tasks', { // API endpoint to add new task
        method: 'POST',
        body: JSON.stringify({ content: taskContent, status: 'To Do' }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const newTask = await response.json();
        console.log('New task added:', newTask);
        // Optionally, update task state or notify user
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)} // Update state with input value
        placeholder="Enter new task"
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default AddTaskForm;
