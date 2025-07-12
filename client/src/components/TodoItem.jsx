import React from 'react';
import { FiEdit2, FiTrash2, FiCheckCircle, FiCircle } from 'react-icons/fi';

const TodoItem = ({ todo, handleEdit, handleDelete, toggleComplete }) => (
  <li className="flex items-center justify-between border-b py-2">
    <div className="flex items-center">
      <button onClick={() => toggleComplete(todo)}>
        {todo.completed
          ? <FiCheckCircle className="text-green-500" />
          : <FiCircle className="text-gray-400" />}
      </button>
      <span className={`ml-2 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.text}
      </span>
    </div>
    <div className="space-x-2">
      <button onClick={() => handleEdit(todo)} title="Edit">
        <FiEdit2 />
      </button>
      <button onClick={() => handleDelete(todo._id)} title="Delete">
        <FiTrash2 className="text-red-600" />
      </button>
    </div>
  </li>
);

export default TodoItem;
