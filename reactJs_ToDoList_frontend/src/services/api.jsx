import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://node-js-to-do-list-backend.vercel.app/aeToDoList/v1',
    timeout: 3000,
    httpsAgent: false
});

export const getTaskDetails = async (tid) => {
  try {
    const response = await apiClient.post('/task/findTasks', { tid });
    if (response.data && response.data.task && response.data.task.length > 0) {
      return { data: response.data.task[0] };
    } else {
      return { error: true, description: "Task not found" };
    }
  } catch (err) {
    return {
      error: true,
      description: err
    };
  }
};

export const findTasks = async (filters) => {
  try {
    return await apiClient.post('/task/findTasks', filters);
  } catch (err) {
    return {
      error: true,
      description: err
    }
  }
};

export const createTask = async (taskData) => {
  try {
    return await apiClient.post('/task/createTask', taskData);
  } catch (err) {
    return {
      error: true,
      description: err
    }
  }
};

export const editTask = async (tid, newData) => {
  try {
    return await apiClient.put(`/task/editTask/${tid}`, { newData });
  } catch (err) {
    return {
      error: true,
      description: err
    }
  }
};

export const deleteTask = async (tid) => {
  try {
    return await apiClient.delete(`/task/deleteTask/${tid}`);
  } catch (err) {
    return {
      error: true,
      description: err
    }
  }
};