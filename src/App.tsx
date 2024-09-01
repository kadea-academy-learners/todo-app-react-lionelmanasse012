import { useRef, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [checkedTasks, setCheckedTasks] = useState<Set<number>>(new Set());

  const addTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      inputRef.current?.focus();
      return;
    }

    setTasks([...tasks, inputValue]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const toggleTaskCheck = (index: number) => {
    const newCheckedTasks = new Set(checkedTasks);
    if (newCheckedTasks.has(index)) {
      newCheckedTasks.delete(index);
    } else {
      newCheckedTasks.add(index);
    }
    setCheckedTasks(newCheckedTasks);
  };

  const deleteTask = (index: number) => {
    // Demander une confirmation avant de supprimer la tâche
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?');

    if (!confirmDelete) {
      return; // Annuler la suppression si l'utilisateur a cliqué sur "Annuler"
    }

    // Supprimer la tâche si l'utilisateur a confirmé
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);

    // Mise à jour des tâches cochées
    const newCheckedTasks = new Set(checkedTasks);
    newCheckedTasks.delete(index);
    setCheckedTasks(newCheckedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Liste des tâches</h1>
        <form className="flex items-center mb-4">
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nouvelle tâche..."
          />
          <button
            onClick={addTask}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Ajouter
          </button>
        </form>

        <div>
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-2 shadow-sm"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name={task}
                  id={task + index}
                  checked={checkedTasks.has(index)}
                  onChange={() => toggleTaskCheck(index)}
                  className="mr-2"
                />
                <label
                  htmlFor={task + index}
                  className={`${checkedTasks.has(index) ? 'line-through text-gray-500' : ''
                    }`}
                >
                  {task}
                </label>
              </div>
              <button
                type="button"
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
