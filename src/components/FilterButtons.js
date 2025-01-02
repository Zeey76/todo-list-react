function FilterButtons({ activeFilter, handleFilterChange }) {
  const filters = ["all", "pending", "completed"];
  return (
    <div class="task-display-bar">
      {filters.map((filter) => (
        <button
          className={activeFilter === filter ? "active" : ""}
          onClick={() => handleFilterChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
