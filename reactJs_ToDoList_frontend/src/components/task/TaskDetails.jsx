import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useTaskDetails } from '../../hooks/useTaskDetails.jsx';

export const TaskDetails = ({ tid, onClose, getTasks }) => {
  const { isFetching, taskDetails, getTaskDetails } = useTaskDetails();

  useEffect(() => {
    if (tid) getTaskDetails(tid);
  }, [getTaskDetails, tid]);

  if (!tid) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>✖</button>

        {isFetching || !taskDetails
          ? <div>Loading...</div>
          : (
            <div className='task-view'>
              tid={taskDetails.tid}
              <h1>{taskDetails.title}</h1>
              <p><strong>Status:</strong> {taskDetails.status}</p>
              <p><strong>Due Date:</strong> {taskDetails.dueDate}</p>
              <p><strong>Creation Date:</strong> {taskDetails.createdAt}</p>
              <div>
                <p><strong>Description:</strong> {taskDetails.description}</p>
              </div>

              {typeof getTasks === 'function' && (
                <button onClick={getTasks}>Refresh list</button>
              )}
            </div>
          )
        }
      </div>
    </div>
  );
};

TaskDetails.propTypes = {
  tid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose: PropTypes.func.isRequired,
  getTasks: PropTypes.func
};
