
export default function NewTodoForm({ newItem, setNewItem, handleSubmit, isLoading, error }) {
  return (
    <form onSubmit={handleSubmit} className="new-item_form">
      <div className="form-row">
        <input
          value={newItem}
          onInput={e => setNewItem(e.target.value)}
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

