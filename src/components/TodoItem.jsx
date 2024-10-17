import { useEffect, useRef, useState } from 'react';
import {  EditIcon, SaveIcon, TrashIcon } from '../svg';

function TodoItem({ todo, removeTodo, editTodo, toggleTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleEdit = () => {
        if (editText.trim()) {
            editTodo(todo.id, editText);
            setIsEditing(false);
        }
    };

    const handleCancelEdit = () => {
        setEditText(todo.text);
        setIsEditing(false);
    };

    const handleDelete = () => {
        removeTodo(todo.id);
        setShowModal(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && editText.trim()) {
            handleEdit();
        }
    };

    const toggleModal = () => setShowModal(!showModal);

    return (
        <li>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        ref={inputRef}
                        onKeyDown={handleKeyDown}
                        className="edit-input"
                    />
                    <button
                        onClick={handleCancelEdit}
                        className="icon-button cancel-button"
                    >
                        x
                    </button>
                    <button
                        onClick={handleEdit}
                        disabled={!editText.trim()}
                        className="icon-button save-button"
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

                    <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                        {todo.text}
                    </span>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="icon-button edit-button"
                    >
                        <EditIcon />
                    </button>
                    <button
                        onClick={toggleModal}
                        className="icon-button delete-button"
                    >
                        <TrashIcon />
                    </button>
                </>
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Are you sure you want to delete this task?</h3>
                        <div className="modal-buttons">
                            <button onClick={handleDelete} className="confirm-button">Yes</button>
                            <button onClick={toggleModal} className="decline-button">No</button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={toggleModal}></div>
                </div>
            )}
        </li>
    );
}

export default TodoItem;