import PropTypes from 'prop-types';

export const TaskPreview = ({ tid, title, createdAt, dueDate, status, openTaskHandler, deleteTask }) => {
  const handleOpen = () => openTaskHandler(tid);
  const handleDelete = () => deleteTask(tid);

  return (
    <div className={`task_preview${status === "COMPLETE" ? " complete" : ""}`}>
      <div className="task_checkbox">
        <input
          type="checkbox"
          checked={status === "COMPLETE"}
          readOnly
        />
      </div>
      <div className="task_info">
        <span className={`task_preview_title${status === "COMPLETE" || status === "DUE" ? " strikethrough" : ""}`}>
          {title}
        </span>
        <div className="task_preview_dates">
          <span className="date-label">Created:</span> {createdAt ? new Date(createdAt).toLocaleString() : ''}
          {" | "}
          <span className="date-label">Due:</span> {dueDate ? new Date(dueDate).toLocaleString() : ''}
        </div>
      </div>
      <div className="task_actions">
        <span className="task_status">{status}</span>
        <button className="icon-btn" onClick={handleOpen} title="Edit">
          <i className="fa-solid fa-pen"></i>
        </button>
        <button className="icon-btn" onClick={handleDelete} title="Delete">
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
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
  deleteTask: PropTypes.func.isRequired
};