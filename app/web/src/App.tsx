import { useState, useEffect } from 'react';
import './App.css';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

const API_URL = 'http://localhost:3001';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTaskTitle.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTaskTitle }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
        setNewTaskTitle('');
      }
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map(t => t.id === id ? updatedTask : t));
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok || response.status === 204) {
        setTasks(tasks.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Task Inbox</h1>

        <form onSubmit={createTask} className="task-form">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter task title..."
            className="task-input"
            disabled={loading}
            data-testid="task-input"
          />
          <button
            type="submit"
            className="add-button"
            disabled={loading || !newTaskTitle.trim()}
            data-testid="add-button"
          >
            Add
          </button>
        </form>

        <div className="task-list" data-testid="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`task-item ${task.completed ? 'completed' : ''}`}
                data-testid="task-item"
                data-task-id={task.id}
              >
                <span className="task-title">{task.title}</span>
                <div className="task-actions">
                  <button
                    onClick={() => completeTask(task.id)}
                    className="complete-button"
                    data-testid="complete-button"
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="delete-button"
                    data-testid="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
