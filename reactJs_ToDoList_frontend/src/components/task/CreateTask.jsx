import PropTypes from 'prop-types';
import { useState } from 'react';
import { createTask } from '../../services/api.jsx';
import toast from 'react-hot-toast';

export const CreateTask = ({ onClose, getTasks }) => {
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '', status: 'INCOMPLETE' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreate = async () => {
    const res = await createTask(formData);
    if (res.error) return toast.error(res.description || "Failed to create task");
    toast.success("Task created!");
    getTasks?.();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>✖</button>
        <div className="task-form">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="INCOMPLETE">INCOMPLETE</option>
            <option value="COMPLETE">COMPLETE</option>
            <option value="DUE">DUE</option>
          </select>
          <button onClick={handleCreate}>Create Task</button>
        </div>
      </div>
    </div>
  );
};

CreateTask.propTypes = {
  onClose: PropTypes.func.isRequired,
  getTasks: PropTypes.func
};
