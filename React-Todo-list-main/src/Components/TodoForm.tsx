import * as React from "react";
import { useState } from "react";

/**
 * Form to input and submit the todo item
 * @param {*} param0
 * @returns
 */
export const TodoForm = ({ addTodo }: { addTodo: any }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: any) => {
    // prevent default action
    e.preventDefault();
    if (value) {
      // add todo
      addTodo(value);
      // clear form after submission
      setValue("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="What is the task today?"
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
