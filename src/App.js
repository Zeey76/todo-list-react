import "./App.css";
import { useEffect, useState, useReducer } from "react";
import TaskInput from "./components/TaskInput";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";
import TaskReducer from "./components/TaskReducer";

function App() {
  const [tasks, dispatch] = useReducer(TaskReducer, [], () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    return savedTasks || [];
  });
  const [taskInput, setTaskInput] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!taskInput.trim()) return;
    dispatch({
      type: "AddTask",
      text: taskInput,
    });
    setTaskInput("");
  }

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const clearTasks = () => dispatch({ type: "ClearTasks" });

  function toggleTask(index) {
    dispatch({
      type: "ToggleTask",
      index: index,
    });
  }

  function deleteTask(index) {
    dispatch({
      type: "DeleteTask",
      index: index,
    });
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
