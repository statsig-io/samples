import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import { Statsig, useExperiment, useGate } from "statsig-react";
import {
  EXPERIMENT_SORTING,
  FEATURE_GATE_1,
  TODO_COMPLETED,
  TODO_CREATED,
  TODO_DELETED,
  TODO_EDITED,
  TODO_LAST_VIEWED,
} from "../Constant";

/**
 * Main component to display the list of todos
 * And handling statsig experiment to sort the todo list
 * Getting the feature to enable or disable the delete option
 * @returns
 */
export const TodoWrapper = () => {
  /**
   * To get the feature gate value from statsig console
   */
  const { value, isLoading } = useGate(FEATURE_GATE_1);
  /**
   * To get the experiment config from statsig console
   */
  const { config } = useExperiment(EXPERIMENT_SORTING);

  console.log(`Feature gate value is: ${value}`);
  console.log(`isLoading ${isLoading}`);
  console.log(`Experiment config is: ${JSON.stringify(config)}`);

  const storedItems = JSON.parse(localStorage.getItem("items"));
  const [todos, setTodos] = useState(storedItems ? storedItems : []);
  const [sortingOrder, setSortingOrder] = useState("default");
  const [featureValue, setFeatureValue] = useState(false);

  /**
   * Experiment keys
   */
  const NEWEST_FIRST = "newest_first";

  /**
   * Setting the experiment and feature value
   * 
   */
  useEffect(() => {
    console.log(`Experiment Config: ${JSON.stringify(config)}`);
    setSortingOrder(config.value.sort_order);
    setFeatureValue(value);
    console.log(`Sorted Order is ${sortingOrder}`);
  }, []);

  /**
   * To set the todo items while any change in todos
   */
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todos));
    console.log(`Updated TODOs: ${JSON.stringify(todos)}`);
  }, [todos]);

  /**
   * To log statsig event with
   * tag,info and metadata
   * @param {*} tag
   * @param {*} task
   * @param {*} message
   */
  const logEvent = (tag, task, message) => {
    Statsig.logEvent(tag, task.toString(), message);
    console.log(`Event logged ${tag}`);
  };

  /**
   * Display the todo items based on experiment decision
   * Sorting the todo list based on the experiment
   * @param {*} isNewestFirst
   */
  const sortTodos = () => {
    let isNewestFirst = sortingOrder === NEWEST_FIRST;
    const sortedTodos = [...todos].sort((a, b) => {
      if (a.createdDate < b.createdDate) return isNewestFirst ? 1 : -1;
      if (a.createdDate > b.createdDate) return isNewestFirst ? -1 : 1;
      return 0;
    });

    console.log(`Sorted todos : ${JSON.stringify(sortedTodos)}`);
    return sortedTodos;
    //setTodos(sortedTodos);
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
      lastViewed: false,
    };

    if (sortingOrder === NEWEST_FIRST) {
      setTodos([todo, ...todos]);
    } else {
      setTodos([...todos, todo]);
    }
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
   *
   * @param {*} lastViewedTodo
   */
  const onLastView = (lastViewedTodo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === lastViewedTodo.id
          ? {
              ...todo,
              lastViewed: !lastViewedTodo.lastViewed,
            }
          : todo
      )
    );

    logEvent(TODO_LAST_VIEWED, lastViewedTodo.task, lastViewedTodo);
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

    logEvent(TODO_COMPLETED, completedTodo.task, completedTodo);
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
              task: editedTask,
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
      <div className="header" style={{ display: "flex" }}>
        <img
          src="https://statsig.com/images/horz_logo.svg"
          style={{ height: "40px", marginRight: "20px" }}
        ></img>
        <h1>TODO's</h1>
      </div>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {sortTodos().map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
            onLastView={onLastView}
            featureValue={featureValue}
          />
        )
      )}
    </div>
  );
};
