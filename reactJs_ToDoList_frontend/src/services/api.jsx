import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://node-js-to-do-list-backend.vercel.app/aeToDoList/v1',
    timeout: 5000,
});

export const getTaskDetails = async (tid) => {
  try {
    const response = await apiClient.post('/task/findTasks', { tid });
    if (response.data?.task?.length > 0) {
      return { data: response.data.task[0] };
    }
    return { error: true, description: "Task not found" };
  } catch (err) {
    return { error: true, description: err.response?.data?.message || err.message };
  }
};

export const findTasks = async (filters) => {
  try {
    const response = await apiClient.post('/task/findTasks', filters);
    return { data: response.data };
  } catch (err) {
    return { error: true, description: err.response?.data?.message || err.message };
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await apiClient.post('/task/createTask', taskData);
    return { data: response.data };
  } catch (err) {
    return { error: true, description: err.response?.data?.message || err.message };
  }
};

export const editTask = async (tid, newData) => {
  try {
    const response = await apiClient.put(`/task/editTask/${tid}`, { newData });
    return { data: response.data };
  } catch (err) {
    return { error: true, description: err.response?.data?.message || err.message };
  }
};

export const deleteTask = async (tid) => {
  try {
    const response = await apiClient.delete(`/task/deleteTask/${tid}`);
    return { data: response.data };
  } catch (err) {
    return { error: true, description: err.response?.data?.message || err.message };
  }
};
