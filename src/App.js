import React, { useState } from 'react';
import FilterTabs from './components/FilterTabs';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('Active');
  const [error, setError] = useState('');

  const handleAddTask = () => {
    const trimmedText = newTaskText.trim();

    if (!trimmedText) {
      setError('Task cannot be empty.');
      return;
    }

    const isDuplicate = tasks.some(
      task => task.text.trim().toLowerCase() === trimmedText.toLowerCase()
    );

    if (isDuplicate) {
      setError('Task already exists.');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    setTasks([newTask, ...tasks]);
    setNewTaskText('');
    setError('');
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : null
          }
        : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Active') return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>To-Do Master</h1>

      <div className="input-section">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {error && <p className="error">{error}</p>}

      <FilterTabs current={filter} setFilter={setFilter} />

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div>
              <span>{task.text}</span>
              <span className="timestamp">
                Created: {new Date(task.createdAt).toLocaleString()}
              </span>
              {task.completed && (
                <span className="timestamp">
                  Completed: {new Date(task.completedAt).toLocaleString()}
                </span>
              )}
            </div>
            <button onClick={() => handleToggleComplete(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
