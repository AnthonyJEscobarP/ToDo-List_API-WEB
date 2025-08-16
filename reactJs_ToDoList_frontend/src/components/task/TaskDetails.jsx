import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTaskDetails } from '../../hooks/useTaskDetails.jsx';
import { editTask as editTaskRequest } from '../../services/api.jsx';
import toast from 'react-hot-toast';

export const TaskDetails = ({ tid, onClose, getTasks }) => {
  const { taskDetails, getTaskDetails, isFetching } = useTaskDetails();
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '', status: 'INCOMPLETE' });

  useEffect(() => {
    if (tid && tid !== 'new') getTaskDetails(tid);
  }, [tid, getTaskDetails]);

  useEffect(() => {
    if (taskDetails) {
      setFormData({
        title: taskDetails.title || '',
        description: taskDetails.description || '',
        dueDate: taskDetails.dueDate ? taskDetails.dueDate.split('T')[0] : '',
        status: taskDetails.status || 'INCOMPLETE'
      });
    }
  }, [taskDetails]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (tid === 'new') return;
    const res = await editTaskRequest(tid, formData);
    if (res.error) return toast.error(res.description || "Failed to update task");
    toast.success("Task updated!");
    getTasks?.();
    onClose();
  };

  if (!tid) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>✖</button>
        <h2 className="modal-title modal-title-gray">Update Task</h2>
        {isFetching && <div>Loading...</div>}
        {!isFetching && (
          <form className="task-form">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <label className="modal-label">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
            <label className="modal-label">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="INCOMPLETE">INCOMPLETE</option>
              <option value="COMPLETE">COMPLETE</option>
              <option value="DUE">DUE</option>
            </select>
            <div className="modal-actions">
              <button className="modal-save" type="button" onClick={handleSave}>Update Task</button>
              <button className="modal-cancel" type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

TaskDetails.propTypes = {
  tid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose: PropTypes.func.isRequired,
  getTasks: PropTypes.func
};