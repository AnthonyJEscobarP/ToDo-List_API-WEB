import PropTypes from 'prop-types';
import { TaskPreview } from './TaskPreview.jsx';

export const ListTasks = ({ tasks, openTaskHandler, deleteTask }) => (
  <div className='tasks-container'>
    {tasks.length === 0 ? (
      <div className="no-tasks">No Todo Found</div>
    ) : (
      tasks.map((t) => (
        <TaskPreview
          key={t.tid}
          tid={t.tid}
          title={t.title}
          createdAt={t.createdAt}
          dueDate={t.dueDate}
          status={t.status}
          openTaskHandler={openTaskHandler}
          deleteTask={deleteTask}
        />
      ))
    )}
  </div>
);

ListTasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  openTaskHandler: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
};