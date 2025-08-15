import { useState } from 'react'; 
import PropTypes from 'prop-types';

export const FilterTasks = ({ onFilter }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ title, status, dueDate });
  };

  const handleClear = () => {
    setTitle('');
    setStatus('');
    setDueDate('');
    onFilter({});
  };

  return (
    <form onSubmit={handleSubmit} className="filter-form">
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="INCOMPLETE">INCOMPLETE</option>
        <option value="COMPLETE">COMPLETE</option>
        <option value="DUE">DUE</option>
      </select>

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

      <button type="submit">Filter</button>
      <button type="button" onClick={handleClear}>Clear</button>
    </form>
  );
};

FilterTasks.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
