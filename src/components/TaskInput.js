const TaskInput = ({ taskInput, setTaskInput, addTask }) => {
  return (
    <>
      <div class="task-input">
        <input
          type="text"
          placeholder="Add a New Task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button class="add-task" onClick={addTask}>
          Add
        </button>
      </div>
    </>
  );
};
export default TaskInput;
