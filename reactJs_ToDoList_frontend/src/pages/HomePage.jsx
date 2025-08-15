import { useState } from 'react';
import { ListTasks } from '../components/task/ListTasks.jsx';
import { FilterTasks } from '../components/task/FilterTasks.jsx';
import { useTasks } from '../hooks/useTasks.jsx';
import { TaskDetails } from '../components/task/TaskDetails.jsx';
import { CreateTask } from '../components/task/CreateTask.jsx';
import './homePage.css';

export const HomePage = () => {
  const { tasks, getTasks, isFetching, filterTasks, updateStatus } = useTasks();
  const [selectedTid, setSelectedTid] = useState(null);
  const [addingTask, setAddingTask] = useState(false);

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>TODO LIST</h1>
        <button className="btn-add-task" onClick={() => setAddingTask(true)}>
          Add Task
        </button>
      </header>

      <FilterTasks onFilter={filterTasks} />

      <ListTasks
        tasks={tasks}
        openTaskHandler={setSelectedTid}
        updateStatus={updateStatus}
      />

      {selectedTid && !addingTask && (
        <TaskDetails
          tid={selectedTid}
          onClose={() => setSelectedTid(null)}
          getTasks={getTasks}
        />
      )}

      {addingTask && (
        <CreateTask
          onClose={() => setAddingTask(false)}
          getTasks={getTasks}
        />
      )}
    </div>
  );
};
