import express from 'express';
import Todo from '../models/todoModel.js';

const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// POST new todo
router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Text is required' });

  const todo = new Todo({ text });
  const createdTodo = await todo.save();
  res.status(201).json(createdTodo);
});

// PUT (update) todo
router.put('/:id', async (req, res) => {
  const { text, completed } = req.body;
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  todo.text = text ?? todo.text;
  todo.completed = completed ?? todo.completed;

  const updated = await todo.save();
  res.json(updated);
});

// DELETE todo
router.delete('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  await todo.deleteOne();
  res.json({ message: 'Todo deleted' });
});

export default router;
