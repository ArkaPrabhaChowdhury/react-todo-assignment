import { useState } from 'react';
import { EditIcon, SaveIcon, TrashIcon } from '../svg';

function TodoItem({ todo, removeTodo, editTodo, toggleTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button
            onClick={handleEdit}
            disabled={!editText.trim()}
            className="save-button"
          >
            <SaveIcon />
          </button>
        </>
      ) : (
        <>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="checkmark"></span>
          </label>
          <span style={{ color: todo.completed ? 'gray' : 'white' }}>
            {todo.text}
          </span>

          <button
            onClick={() => setIsEditing(true)}
            className="icon-button edit-button"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => removeTodo(todo.id)}
            className="icon-button delete-button"
          >
            <TrashIcon />
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
