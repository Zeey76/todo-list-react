const TaskList = ({ tasks, toggleTask, deleteTask }) => {
  return (
    <>
      <ul class="task-list">
        {tasks.map((task, index) => {
          return (
            <li key={index}>
              <div
                className={`check-icon ${task.completed ? "ticked" : ""}`}
                onClick={() => toggleTask(index)}
              >
                {task.completed && <img src="./icons/icon-check.svg" alt="check-icon"/>}
              </div>
              <p
                className={task.completed ? "completed" : ""}
                onClick={() => toggleTask(index)}
              >
                {task.text}
              </p>
              <button className="cross-icon" onClick={() => deleteTask(index)}>
                X
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default TaskList;
