const TaskReducer = (state, action) => {
  switch (action.type) {
    case "AddTask":
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];
    case "ToggleTask":
      return state.map((task, i) =>
        i === action.index ? { ...task, completed: !task.completed } : task
      );
    case "DeleteTask":
      return state.filter((_, i) => i !== action.index);
    case "ClearTasks":
      return [];
    default:
      return state;
  }
};
export default TaskReducer;
