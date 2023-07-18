import {useState} from 'react';
import React from 'react';
/**
 * Renders a todo item.
 *
 * @param {object} props - The component props.
 * @param {object} props.todo - The todo item.
 * @param {function} props.toggleTodo
 *  - The function to toggle the todo item's completion status.
 * @param {function} props.deleteTodo - The function to delete the todo item.
 * @return {JSX.Element} The rendered TodoItem component.
 */
export default function TodoItem({todo, toggleTodo, deleteTodo}) {
  const [visibleDetails, setVisibleDetails] = useState([]);

  // Function for when the SHOW DETAILS button is pressed
  const handleDetailsButtonClick = (key) => {
    if (visibleDetails.includes(key)) {
      setVisibleDetails(visibleDetails.filter((item) => item !== key));
    } else {
      setVisibleDetails([...visibleDetails, key]);
    }
  };

  const handleCheckboxChange = (e) => {
    toggleTodo(todo.key, e.target.checked);
  };

  const handleDeleteClick = () => {
    deleteTodo(todo.key);
  };
  const isDetailsVisible = (key) => visibleDetails.includes(key);
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
        />
        {todo.title}
      </label>
      <div className="task">
        <div className="button-group">
          <button onClick={handleDeleteClick}
            className="btn btn-danger">Delete</button>
        </div>

        <div className="Data">
          <button onClick={() =>
            handleDetailsButtonClick(todo.key)}>Show Details</button>
          {isDetailsVisible(todo.key) && (
            <div className="time">
                          Creation Time: {todo.creationTime}<br/>
                          Completion Time: {todo.completedTime}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
