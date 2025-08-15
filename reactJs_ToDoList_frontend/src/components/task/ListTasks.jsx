import PropTypes from 'prop-types';
import { TaskPreview } from './TaskPreview.jsx';

export const ListTasks = ({ tasks, openTaskHandler, updateStatus }) => (
  <div className='tasks-container'>
    {tasks.map((t) => (
      <TaskPreview
        key={t.tid}
        tid={t.tid}
        title={t.title}
        createdAt={t.createdAt}
        dueDate={t.dueDate}
        status={t.status}
        openTaskHandler={openTaskHandler}
        updateStatus={updateStatus}
      />
    ))}
  </div>
);

ListTasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  openTaskHandler: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired
};
