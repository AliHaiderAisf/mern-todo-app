import React from 'react';
import { FiPlus } from 'react-icons/fi';

const TodoForm = ({ text, setText, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="flex mb-4">
    <input
      className="flex-grow border rounded-l px-3 py-2 focus:outline-none"
      placeholder="Enter a todo..."
      value={text}
      onChange={e => setText(e.target.value)}
    />
    <button
      type="submit"
      className="bg-green-500 text-white px-4 rounded-r hover:bg-green-600 transition"
    >
      <FiPlus className="inline" />
    </button>
  </form>
);

export default TodoForm;
