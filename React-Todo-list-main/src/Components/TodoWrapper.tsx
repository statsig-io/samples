import * as React from "react";
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
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { TODOType } from "../AppDtos/DTOS";
import { useState, useEffect } from "react";
import { WarningBanner } from "./WarningBanner";
import {
  deleteTodoById,
  getAllTodos,
  postTodo,
  updateTodo,
} from "../NetworkService";

/**
 * Main component to display the list of todos
 * And handling statsig experiment to sort the todo list
 * Getting the feature to enable or disable the delete option
 * @returns
 */
export const TodoWrapper = ({ onLogout }: { onLogout: any }) => {
  /**
   * To get the feature gate value from statsig console
   */
  const { value, isLoading } = useGate(FEATURE_GATE_1);
  /**
   * To get the experiment config from statsig console
   */
  const { config: experimentConfig } = useExperiment(EXPERIMENT_SORTING);

  const { config: dynamicConfig } = useConfig(DYNAMIC_CONFIG_WARNING_BANNER);

  console.log(`Feature gate value is: ${value}`);
  console.log(`isLoading ${isLoading}`);
  console.log(`Experiment config is: ${JSON.stringify(experimentConfig)}`);
  console.log(`Dynamic config is: ${JSON.stringify(dynamicConfig)}`);

  const storedItems: any[] | null = JSON.parse(
    localStorage.getItem("items") || ""
  );

  const [todos, setTodos] = useState(storedItems ? storedItems : []);

  /**
   * Experiment keys
   */
  const NEWEST_FIRST = "newest_first";

  /**
   * to first time read the data from the server
   */
  useEffect(() => {
    getAllTodos()
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error(error);
      });

    const data = getAllTodos();
    console.log("Return data " + data);
  }, []);

  /**
   * To set the todo items while any change in todos
   */
  useEffect(() => {
    // localStorage.setItem("items", JSON.stringify(todos));
    console.log(`Updated TODOs: ${JSON.stringify(todos)}`);
  }, [todos]);

  /**
   * To log statsig event with
   * tag,info and metadata
   * @param {*} tag
   * @param {*} task
   * @param {*} message
   */
  const logEvent = (tag: string, task: any, message: any) => {
    Statsig.logEvent(tag, task.toString(), message);
    console.log(`Event logged ${tag}`);
  };

  /**
   * Display the todo items based on experiment decision
   * Sorting the todo list based on the experiment
   * @param {*} isNewestFirst
   */
  const sortTodos = () => {
    let isNewestFirst = experimentConfig.value.sort_order === NEWEST_FIRST;
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
  const addTodo = (task: string) => {
    let todo = {
      id: 0,
      serialNumber: todos[todos.length - 1]
        ? todos[todos.length - 1].serialNumber + 1
        : 1,
      task: task,
      completed: false,
      description: "",
      edited: false,
      isEditing: false,
      createdDate: new Date(),
      modifiedDate: new Date(),
      lastViewed: false,
    };

    postTodo(todo)
      .then((data) => {
        todo.id = data.id;
        if (
          experimentConfig.value &&
          experimentConfig.value.sort_order === NEWEST_FIRST &&
          data.id
        ) {
          setTodos([todo, ...todos]);
        } else {
          setTodos([...todos, todo]);
        }
        logEvent(TODO_CREATED, task, todo);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /**
   * To delete the todo
   * @param {*} deleteTodo
   */
  const deleteTodo = (deleteTodo: TODOType) => {
    deleteTodoById(deleteTodo.id)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== deleteTodo.id));
        logEvent(TODO_DELETED, deleteTodo.task, deleteTodo);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /**
   *
   * @param {*} lastViewedTodo
   */
  const onLastView = (lastViewedTodo: TODOType) => {
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
  const toggleComplete = (completedTodo: TODOType) => {
    completedTodo.completed = !completedTodo.completed;
    updateTodo(completedTodo)
      .then((data) => {
        if (data.id) {
          setTodos(
            todos.map((todo) =>
              todo.id === completedTodo.id
                ? {
                    ...todo,
                    completed: todo.completed,
                    modifiedDate: new Date(),
                  }
                : todo
            )
          );
          logEvent(TODO_COMPLETED, completedTodo.task, completedTodo);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /**
   * To toggle todo task
   * @param {*} task
   */
  const editTodo = (editTodo: TODOType) => {
    setTodos(
      todos.map((todo) =>
        todo.id === editTodo.id
          ? { ...todo, isEditing: !todo.isEditing, modifiedDate: new Date() }
          : todo
      )
    );
    logEvent(TODO_EDITED, editTodo.task, editTodo);
  };

  /**
   * Updating the todo task
   * @param editedTask
   * @param editedTodo
   */
  const editTask = (editedTask: string, editedTodo: TODOType) => {
    editedTodo.edited = true;
    editedTodo.task = editedTask;
    updateTodo(editedTodo)
      .then((data) => {
        if (data.id) {
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
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
        ></FontAwesomeIcon>
      </div>
      {/**
       * Adding the warning banner
       */}
      {Object.keys(dynamicConfig.value).length > 0 && (
        <WarningBanner dynamicValue={dynamicConfig.value}></WarningBanner>
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
            featureValue={value}
          />
        )
      )}
    </div>
  );
};
