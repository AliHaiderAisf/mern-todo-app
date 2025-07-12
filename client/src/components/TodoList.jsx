import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos = [], handleEdit, handleDelete, toggleComplete }) => {
  if (!Array.isArray(todos)) {
    return <p className="text-red-500">Invalid data for todos</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
