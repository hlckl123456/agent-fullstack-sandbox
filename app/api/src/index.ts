import express, { Request, Response } from 'express';
import cors from 'cors';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

const app = express();
const PORT = 3001;

// In-memory storage
let tasks: Task[] = [];
let nextId = 1;

// Middleware
app.use(cors());
app.use(express.json());

// GET /tasks - List all tasks
app.get('/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

// POST /tasks - Create new task
app.post('/tasks', (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({ error: 'Title is required' });
    return;
  }

  const newTask: Task = {
    id: String(nextId++),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH /tasks/:id - Update task (complete)
app.patch('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;

  const task = tasks.find(t => t.id === id);

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  if (typeof completed === 'boolean') {
    task.completed = completed;
  }

  res.json(task);
});

// DELETE /tasks/:id - Delete task
app.delete('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
