import { useState } from 'react';
import { ListTasks } from '../components/task/ListTasks.jsx';
import { FilterTasks } from '../components/task/FilterTasks.jsx';
import { useTasks } from '../hooks/useTasks.jsx';
import { TaskDetails } from '../components/task/TaskDetails.jsx';
import { CreateNewTask } from '../components/task/CreateNewTask.jsx';
import './homePage.css';

export const HomePage = () => {
  const { tasks, getTasks, filterTasks, updateStatus, deleteTask } = useTasks();
  const [selectedTid, setSelectedTid] = useState(null);
  const [addingTask, setAddingTask] = useState(false);

  return (
    <div className="homepage-container">
      <h1 className="todo-title">TODO LIST</h1>

      <div className="filters-row">
        <div className="filters-left">
          <FilterTasks onFilter={filterTasks} setAddingTask={setAddingTask} />
        </div>
      </div>
      <ListTasks
        tasks={tasks}
        openTaskHandler={setSelectedTid}
        updateStatus={updateStatus}
        deleteTask={deleteTask}
      />
      {selectedTid && !addingTask && (
        <TaskDetails
          tid={selectedTid}
          onClose={() => setSelectedTid(null)}
          getTasks={getTasks}
        />
      )}
      {addingTask && (
        <CreateNewTask
          onClose={() => setAddingTask(false)}
          getTasks={getTasks}
        />
      )}
    </div>
  );
};