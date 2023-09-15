import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import { Statsig } from "statsig-react";


export const TodoWrapper = () => {
  const storedItems = JSON.parse(localStorage.getItem('items'));
  const [todos, setTodos] = useState(storedItems ? storedItems: []);


  /**
   * To set the todo items while any change in todos
   */
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todos));
    console.log(`Updated TODOs: ${JSON.stringify(todos)}`)

  }, [todos]);
  

  const logEvent = (tag, message) => {
    Statsig.logEvent(tag,message)

    console.log(`Event logged ${tag}`)
  }

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), 
        serialNumber: todos[todos.length-1] ? todos[todos.length-1].serialNumber+1 : 1,
        task: todo, 
        completed: false, 
        isEditing: false, 
        createdDate: new Date(), 
        modifiedDate: new Date() },
    ]);

    logEvent("TODO_ADDED",todo)
  }

  const deleteTodo = (id) =>{
   setTodos(todos.filter((todo) => todo.id !== id));

   logEvent("TODO_DELETED",id)

  }

  const toggleComplete = (id) => {
    let item;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { 
          ...todo, completed: !todo.completed , modifiedDate: new Date()
        } : todo
      )
      
    );

    logEvent("TODO_COMPLETED",id)

  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing, modifiedDate: new Date() } : todo
      )
    );
    logEvent("TODO_EDITED",id)

  }

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing, modifiedDate: new Date() } : todo
      )
    );
    logEvent("TASK_EDITED",id,JSON.stringify(task))

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
