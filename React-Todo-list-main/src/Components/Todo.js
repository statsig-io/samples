import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faWarning } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

/**
 * Component to display individual todo item
 * Based on statsig feature displaying the delete option
 *
 * @param {*} param0
 * @returns
 */
export const Todo = ({
  task,
  deleteTodo,
  editTodo,
  toggleComplete,
  onLastView,
  featureValue,
}) => {
  return (
    <div className="Todo">
      <p
        className={`${task.completed ? "completed" : ""}`}
        onMouseLeave={() => onLastView(task)}
        onClick={() => toggleComplete(task)}
      >
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task)} />
        {featureValue && (
          <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task)} />
        )}
      </div>
    </div>
  );
};
