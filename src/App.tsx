import { useRef, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [tasks, setTask] = useState<string[]>([])

  const [inputValue, setInputValue] = useState<string>('')

  const inputRef = useRef<HTMLInputElement>(null)

  const [taskChecked, setTaskChecked] = useState<boolean>(false)

  const addTask = () => {
    if (inputValue.trim() === '') {
      inputRef.current?.focus()
      return;
    }

    setTask([...tasks, inputValue]);
    setInputValue('')
    inputRef.current?.focus()
  }

  const isChecked = () => {
    setTaskChecked(!taskChecked)
  }

  return (
    <>
      <div>
        <h1>Liste des tâches</h1>
        <input type="text" ref={inputRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <input type="button" value="Ajouter" onClick={addTask} />

        <div>
          {tasks.map((task, index) => (
            <div className='task'>
              <input type="checkbox" name={task} id={task + index} onChange={isChecked} />
              <label htmlFor={task + index} className={taskChecked ? 'taskChecked' : ''} key={index}>{task}</label>
              <button type="button">Supprimer</button>
            </div>
          ))}
        </div>
      </div>
    </>)
}

export default App
