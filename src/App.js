import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);

    /**
     * Loads todos from localStorage on component mount
     */
    useEffect(() => {
        try {
            const storedTodos = localStorage.getItem('todos');
            if (storedTodos) {
                const parsedTodos = JSON.parse(storedTodos);
                if (Array.isArray(parsedTodos)) {
                    setTodos(parsedTodos);
                }
            }
        } catch (error) {
            console.error('Error parsing todos from localStorage:', error);
        }
    }, []);

    /**
     * Updates localStorage whenever todos change
     */
    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);

    /**
     * Adds a new todo to the list
     * @param {string} todo - The text of the new todo
     */
    const addTodo = (todo) => {
        setTodos((prevTodos) => [
            ...prevTodos,
            { id: Date.now(), text: todo, completed: false },
        ]);
    };

    /**
     * Removes a todo from the list
     * @param {number} id - The id of the todo to remove
     */
    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    /**
     * Edits the text of a todo
     * @param {number} id - The id of the todo to edit
     * @param {string} newText - The new text for the todo
     */
    const editTodo = (id, newText) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    /**
     * Toggles the completed status of a todo
     * @param {number} id - The id of the todo to toggle
     */
    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="App">
            <h1>To-Do List</h1>
            <TodoForm addTodo={addTodo} />
            <TodoList
                todos={todos}
                removeTodo={removeTodo}
                editTodo={editTodo}
                toggleTodo={toggleTodo}
            />
        </div>
    );
}

export default App;
