import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import { Statsig, useConfig, useExperiment, useGate } from "statsig-react";
import {
  DYNAMIC_CONFIG_WARNING_BANNER,
  EXPERIMENT_SORTING,
  FEATURE_GATE_1,
  TODO_COMPLETED,
  TODO_CREATED,
  TODO_DELETED,
  TODO_EDITED,
  TODO_LAST_VIEWED,
} from "../Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faWarning } from "@fortawesome/free-solid-svg-icons";

/**
 * Main component to display the list of todos
 * And handling statsig experiment to sort the todo list
 * Getting the feature to enable or disable the delete option
 * @returns
 */
export const TodoWrapper = ({ onLogout }) => {
  /**
   * To get the feature gate value from statsig console
   */
  const { value, isLoading } = useGate(FEATURE_GATE_1);
  /**
   * To get the experiment config from statsig console
   */
  const { config: experimentConfig } = useExperiment(EXPERIMENT_SORTING);

  /**
   * To get the dynamic config
   */
  const { config: dynamicConfig } = useConfig(DYNAMIC_CONFIG_WARNING_BANNER);

  console.log(`Feature gate value is: ${value}`);
  console.log(`isLoading ${isLoading}`);
  console.log(`Experiment config is: ${JSON.stringify(experimentConfig)}`);
  console.log(`Dynamic config is: ${JSON.stringify(dynamicConfig)}`);

  const storedItems = JSON.parse(localStorage.getItem("items"));
  const [todos, setTodos] = useState(storedItems ? storedItems : []);
  const [sortingOrder, setSortingOrder] = useState("default");
  const [featureValue, setFeatureValue] = useState(false);
  const [dynamicValue, setDynamicValue] = useState({});

  /**
   * Experiment keys
   */
  const NEWEST_FIRST = "newest_first";

  /**
   * Setting the experiment and feature value
   *
   */
  useEffect(() => {
    console.log(`Experiment Config: ${JSON.stringify(experimentConfig)}`);
    setSortingOrder(experimentConfig.value.sort_order);
    setFeatureValue(value);
    setDynamicValue(dynamicConfig.value);
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
      <div className="header" style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://statsig.com/images/horz_logo.svg"
          alt="Statsig logo"
          style={{ height: "40px", marginRight: "20px" }}
        ></img>
        <h1>TODOs</h1>

        <FontAwesomeIcon
          style={{
            marginLeft: "3rem",
            color: `white`,
            position: "relative",
          }}
          icon={faSignOut}
          onClick={onLogout}
        />
      </div>
      {/**
       * Adding the warning banner
       */}
      {Object.keys(dynamicValue).length > 0 && (
        <div
          style={{
            padding: "1rem",
            marginTop: ".5rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: `${dynamicValue.backgroundColor}`,
          }}
        >
          <p style={{ fontSize: "1rem", color: `${dynamicValue.textColor}` }}>
            {dynamicValue.message}
          </p>
        </div>
      )}

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
