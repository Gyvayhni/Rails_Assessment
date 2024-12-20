import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Task {
  id: string;
  content: string;
}

interface TaskList {
  id: string;
  name: string;
  tasks: Task[];
}

const TaskBoard: React.FC = () => {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]); // Initially empty

  // Load task lists from localStorage or set default if not available
  useEffect(() => {
    const storedTaskLists = localStorage.getItem("taskLists");

    if (storedTaskLists) {
      const parsedLists = JSON.parse(storedTaskLists);
      
      // Check if task lists contain the correct structure
      if (parsedLists.every((list: TaskList) => ['todo', 'inprogress', 'done'].includes(list.id))) {
        setTaskLists(parsedLists);
      } else {
        // Set default task lists if structure is not correct
        setTaskLists([ 
          { id: "todo", name: "To Do", tasks: [] },
          { id: "inprogress", name: "In Progress", tasks: [] },
          { id: "done", name: "Done", tasks: [] },
        ]);
      }
    } else {
      // Set default task lists if no data is found in localStorage
      setTaskLists([ 
        { id: "todo", name: "To Do", tasks: [] },
        { id: "inprogress", name: "In Progress", tasks: [] },
        { id: "done", name: "Done", tasks: [] },
      ]);
    }
  }, []);

  // Save task lists to localStorage whenever taskLists change
  useEffect(() => {
    if (taskLists.length) {
      localStorage.setItem("taskLists", JSON.stringify(taskLists));
    }
  }, [taskLists]);

  const addTask = (listId: string) => {
    const taskContent = prompt("Enter task content:");
    if (!taskContent) return;

    setTaskLists(
      taskLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [...list.tasks, { id: `${Date.now()}`, content: taskContent }],
            }
          : list
      )
    );
  };

  const deleteTask = (listId: string, taskId: string) => {
    setTaskLists(
      taskLists.map((list) =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list
      )
    );
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return; // Drop was outside any list

    const sourceListIndex = taskLists.findIndex(
      (list) => list.id === source.droppableId
    );
    const destListIndex = taskLists.findIndex(
      (list) => list.id === destination.droppableId
    );

    const newTaskLists = [...taskLists];
    const [movedTask] = newTaskLists[sourceListIndex].tasks.splice(source.index, 1); // Remove task
    newTaskLists[destListIndex].tasks.splice(destination.index, 0, movedTask); // Add task to destination

    setTaskLists(newTaskLists); // Update state
  };

  return (
    <div className="taskboard-container">
      <h1 className="taskboard-header">Task Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-lists-container">
          {taskLists.map((list) => (
            <Droppable key={list.id} droppableId={list.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="task-list"
                >
                  <div className="task-list-title">{list.name}</div>
                  <ul>
                    {list.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-item"
                          >
                            {task.content}
                            <button
                              onClick={() => deleteTask(list.id, task.id)}
                              className="task-item-delete-btn"
                            >
                              <i className="fa-solid fa-trash"></i> {/* Font Awesome trash icon */}
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </ul>
                  {provided.placeholder}
                  <button onClick={() => addTask(list.id)} className="add-task-btn">
                    Add Task
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
