// components/TaskList.tsx or pages/TaskList.tsx
import { useEffect, useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // To store tasks fetched from the backend

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks'); // API endpoint to fetch tasks
      if (response.ok) {
        const data = await response.json();
        setTasks(data); // Update state with the fetched tasks
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Call fetchTasks when the component mounts
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.content}</li> // Render each task
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
