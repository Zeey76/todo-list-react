
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || []
  })
  const [taskInput, setTaskInput] = useState("");
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    if (!taskInput.trim()) return
    setTasks([
      ...tasks,
      {
        text: taskInput,
        completed: false
      }
    ])
    setTaskInput("")
  }

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  function clearTasks() {
    setTasks([])
  }

  function toggleTask(index) {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? {...task, completed: !task.completed} : task
    )
    setTasks(updatedTasks)
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index)
    setTasks(updatedTasks)
  }

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === "pending") return !task.completed
    if (activeFilter === "completed") return task.completed
    return true
  })

 return(
  <div className='container'>
    <div class="task-title">
        <header>
            <h2>To Do List</h2>
        </header>
        <div class="task-input">
            <input type="text" placeholder="Add a New Task" value={taskInput} onChange={(e) => setTaskInput(e.target.value)}/>
            <button class="add-task" onClick={addTask}>Add</button>
        </div>
    </div>
    <div class="main">
        <div class="tasks-bar">
            <div class="task-display-bar">
               <FilterButtons display= {activeFilter === "all" ? "active" : ""} onShow ={() => handleFilterChange("all")} name="All"/>
               <FilterButtons display= {activeFilter === "pending" ? "active" : ""} onShow ={() => handleFilterChange("pending")} name="Pending"/>
               <FilterButtons display= {activeFilter === "completed" ? "active" : ""} onShow ={() => handleFilterChange("completed")} name="Completed"/>
            </div>
            <button class="clear-tasks" onClick={clearTasks}>Clear All</button>
        </div>
        <ul class="task-list">
          {filteredTasks.map((task, index) => {
            return <li className={task.completed ? "completed" : ""} key={index}>
                      <div className={`check-icon ${task.completed ? "ticked" : ""}`}>
                        <img src="reactapp\icons\icon-check.svg" onClick={() => toggleTask(index)}/>
                      </div>
                      <p onClick={() => toggleTask(index)}>{task.text}</p>
                      <button className="cross-icon" onClick={() => deleteTask(index)}>X</button>
                    </li>
          })}
        </ul>
    </div>
  </div>
 )
}

function FilterButtons({ display, onShow, name}) {
  return (
    <button className={display} onClick={onShow}>{name}</button>
  )
}

export default App;
