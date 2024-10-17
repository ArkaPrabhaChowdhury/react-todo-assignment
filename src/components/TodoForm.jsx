import { useRef, useState } from 'react';
import { AddIcon } from '../svg';

function TodoForm({ addTodo }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      addTodo(trimmedInput);
      setInput('');
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
        ref={inputRef}
      />
      <button type="submit" aria-label="Add task" disabled={!input.trim()} className='add-task'>
        <AddIcon />
      </button>
    </form>
  );
}

export default TodoForm;
