import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import Spinner from '../components/Spinner';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/todos');
      setTodos(data);
    } catch {
      toast.error('Error fetching todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return toast.warn('Enter todo text');
    try {
      if (editing) {
        const { data } = await axios.put(`/api/todos/${editing._id}`, { text });
        setTodos(todos.map(t => t._id === data._id ? data : t));
        toast.success('Updated todo');
      } else {
        const { data } = await axios.post('/api/todos', { text });
        setTodos([data, ...todos]);
        toast.success('Added todo');
      }
      setText(''); setEditing(null);
    } catch {
      toast.error('Save failed');
    }
  };

  const handleEdit = (todo) => {
    setEditing(todo);
    setText(todo.text);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this?')) return;
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter(t => t._id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const { data } = await axios.put(`/api/todos/${todo._id}`, { completed: !todo.completed });
      setTodos(todos.map(t => t._id === data._id ? data : t));
      toast.info(data.completed ? 'Marked complete' : 'Marked incomplete');
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 ">
      <h1 className="text-3xl font-bold text-center mb-6">📝 Todo List</h1>
      <TodoForm
        text={text}
        setText={setText}
        handleSubmit={handleSubmit}
      />
      {loading ? <Spinner /> : (
        <TodoList
          todos={todos}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          toggleComplete={toggleComplete}
        />
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Home;
