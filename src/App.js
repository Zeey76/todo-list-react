import "./App.css";
import { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [taskInput, setTaskInput] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!taskInput.trim()) return;
    setTasks([
      ...tasks,
      {
        text: taskInput,
        completed: false,
      },
    ]);
    setTaskInput("");
  }

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const clearTasks = () => setTasks([]);

  function toggleTask(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "pending") return !task.completed;
    if (activeFilter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="container">
      <div class="task-title">
        <header>
          <h2>To Do List</h2>
        </header>
        <TaskInput
          taskInput={taskInput}
          setTaskInput={setTaskInput}
          addTask={addTask}
        />
      </div>
      <div class="main">
        <div class="tasks-bar">
          <FilterButtons
            activeFilter={activeFilter}
            handleFilterChange={handleFilterChange}
          />
          <button class="clear-tasks" onClick={clearTasks}>
            Clear All
          </button>
        </div>
        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
