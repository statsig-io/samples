import React from 'react'
import { useGate } from "statsig-react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FEATURE_GATE_1 } from '../Constant';

/**
 * Component to display individual todo item
 * Based on statsig feature displaying the delete option
 * 
 * @param {*} param0 
 * @returns 
 */
export const Todo = ({task, deleteTodo, editTodo, toggleComplete, onLastView}) => {
 
  const { value,isLoading } = useGate(FEATURE_GATE_1);

  console.log(`Value is ${value}`)
  console.log(`isLoading ${isLoading}`)

  return (
    <div className="Todo">
        <p className={`${task.completed ? 'completed' : ""}`} 
        onMouseLeave={() => onLastView(task)}
        onClick={() => toggleComplete(task)}>{task.task}</p>
        <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task)} />
       { value && <FontAwesomeIcon  icon={faTrash} onClick={() => deleteTodo(task)} />}
        </div>
    </div>
  )
}
