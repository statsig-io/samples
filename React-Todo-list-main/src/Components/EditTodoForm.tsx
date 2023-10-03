import * as React from "react";
import { useState } from "react";
import { TODOType } from "../AppDtos/DTOS";

export const EditTodoForm = ({
  editTodo,
  task,
}: {
  editTodo: any;
  task: TODOType;
}) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e: any) => {
    // prevent default action
    e.preventDefault();
    // edit todo
    editTodo(value, task);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
