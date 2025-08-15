import { useState } from 'react';
import { ListTasks } from '../components/task/ListTasks.jsx';
import { FilterTasks } from '../components/task/FilterTasks.jsx';
import { useTasks } from '../hooks/useTasks.jsx';
import { TaskDetails } from '../components/task/TaskDetails.jsx';
import './homePage.css';

export const HomePage = () => {
  const { tasks, getTasks, isFetching, filterTasks, updateStatus } = useTasks();
  const [selectedTid, setSelectedTid] = useState(null);

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>TODO LIST</h1>
        <button className="btn-add-task" onClick={() => setSelectedTid('new')}>
          Add Task
        </button>
      </header>

      <FilterTasks onFilter={filterTasks} />

      <ListTasks
        tasks={tasks}
        openTaskHandler={setSelectedTid}
        updateStatus={updateStatus}
      />

      {selectedTid && (
        <TaskDetails
          tid={selectedTid}
          onClose={() => setSelectedTid(null)}
          getTasks={getTasks}
        />
      )}
    </div>
  );
};
