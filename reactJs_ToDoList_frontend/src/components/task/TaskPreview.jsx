import PropTypes from 'prop-types';

export const TaskPreview = ({ tid, title, createdAt, dueDate, status, openTaskHandler, updateStatus }) => {
  const handleOpen = () => openTaskHandler(tid);
  const handleStatusChange = (e) => updateStatus(tid, e.target.value);

  return (
    <div className='task_preview'>
      <div className="status-indicator">
        <input type="checkbox" checked={status === "COMPLETE"} readOnly />
      </div>

      <span className='task_preview_title' onClick={handleOpen}>{title}</span>

      <select value={status} onChange={handleStatusChange}>
        <option value="INCOMPLETE">INCOMPLETE</option>
        <option value="COMPLETE">COMPLETE</option>
        <option value="DUE">DUE</option>
      </select>

      <span className='task_preview_dates'>
        creation: {createdAt} | due: {dueDate}
      </span>

      <button onClick={handleOpen}>Edit</button>
      <button>Delete</button>
    </div>
  );
};

TaskPreview.propTypes = {
  tid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  dueDate: PropTypes.string,
  status: PropTypes.string,
  openTaskHandler: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired
};
