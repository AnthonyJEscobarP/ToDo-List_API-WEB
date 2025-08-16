import { useState } from 'react';
import PropTypes from 'prop-types';

export const FilterTasks = ({ onFilter,setAddingTask }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {};
    if (title) filters.title = title;
    if (status) filters.status = status;
    if (dueDate) filters.dueDate = dueDate;
    onFilter(filters);
  };

  const handleClear = () => {
    setTitle('');
    setStatus('');
    setDueDate('');
    onFilter({});
  };

  return (
    <div className="filter-form-wrapper">
      <form onSubmit={handleSubmit} className="filter-form">
        <button className="btn-add-task" onClick={() => setAddingTask(true)}>
          Add Task
        </button>
        <input
          type="text"
          placeholder="Search title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">ALL</option>
          <option value="INCOMPLETE">INCOMPLETE</option>
          <option value="COMPLETE">COMPLETE</option>
          <option value="DUE">DUE</option>
        </select>
      </form>
      <div className="filter-buttons">
        <button type="button" onClick={handleSubmit}>Search</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

FilterTasks.propTypes = {
  onFilter: PropTypes.func.isRequired,
};