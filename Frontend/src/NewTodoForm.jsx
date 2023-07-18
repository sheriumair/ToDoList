import React from 'react';



/**
 * A form for adding a new todo item.
 * @param {object} props - The component props.
 * @param {string} props.newItem
 * - The current value of the new item input field.
 * @param {function} props.setNewItem
 * - The function to update the value of the new item input field.
 * @param {function} props.handleSubmit
 * - The function to handle the form submission.
 * @param {boolean} props.isLoading
 * - Indicates whether the form is currently in a loading state.
 * @param {string|null} props.error - An error message, if any.
 * @return {JSX.Element} - The JSX element representing the new todo form.
 */
export default function NewTodoForm(
    {newItem, setNewItem, handleSubmit, isLoading, error}) {
  return (
    <form onSubmit={handleSubmit} className="new-item_form">
      <div className="form-row">
        <input
          value={newItem}
          onInput={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
          placeholder="Enter task here"
        />
      </div>
      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add'}
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </form>
  );
}

