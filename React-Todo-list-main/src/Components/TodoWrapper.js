import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import { Statsig } from "statsig-react";
import {
  TODO_COMPLETED,
  TODO_CREATED,
  TODO_DELETED,
  TODO_EDITED,
} from "../Constant";

export const TodoWrapper = () => {
  const storedItems = JSON.parse(localStorage.getItem("items"));
  const [todos, setTodos] = useState(storedItems ? storedItems : []);

  /**
   * To set the todo items while any change in todos
   */
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todos));
    console.log(`Updated TODOs: ${JSON.stringify(todos)}`);
  }, [todos]);

  const logEvent = (tag, task, message) => {
    Statsig.logEvent(tag, task, message);

    console.log(`Event logged ${tag}`);
  };

  /**
   * Create a todo task
   * @param {*} todo
   */
  const addTodo = (task) => {
    let todo = {
      id: uuidv4(),
      serialNumber: todos[todos.length - 1]
        ? todos[todos.length - 1].serialNumber + 1
        : 1,
      task: task,
      completed: false,
      isEditing: false,
      createdDate: new Date(),
      modifiedDate: new Date(),
    };

    setTodos([...todos, todo]);

    logEvent(TODO_CREATED, task, todo);
  };

  /**
   * To delete the todo
   * @param {*} deleteTodo
   */
  const deleteTodo = (deleteTodo) => {
    setTodos(todos.filter((todo) => todo.id !== deleteTodo.id));

    logEvent(TODO_DELETED, deleteTodo.task, deleteTodo);
  };

  /**
   * To toggle the task complete or incomplete
   * @param {*} task
   */
  const toggleComplete = (completedTodo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === completedTodo.id
          ? {
              ...todo,
              completed: !todo.completed,
              modifiedDate: new Date(),
            }
          : todo
      )
    );

    logEvent(TODO_COMPLETED, completedTodo.task,completedTodo);
  };

  /**
   * To Edit the task
   * @param {*} task
   */
  const editTodo = (editTodo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === editTodo.id
          ? { ...todo, isEditing: !todo.isEditing, modifiedDate: new Date() }
          : todo
      )
    );
  };

  const editTask = (editedTask, editedTodo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === editedTodo.id
          ? {
              ...todo,
              task:editedTask,
              isEditing: !todo.isEditing,
              modifiedDate: new Date(),
            }
          : todo
      )
    );
    logEvent(TODO_EDITED, editedTask, editedTodo);
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
