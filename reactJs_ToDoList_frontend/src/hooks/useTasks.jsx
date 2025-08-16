import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { findTasks as findTasksRequest, deleteTask as deleteTaskRequest } from '../services/api.jsx';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const getTasksFunction = useCallback(async () => {
        setIsFetching(true);
        const res = await findTasksRequest({});
        if (res.error) {
            toast.error(res.description || "Error fetching tasks");
            setTasks([]);
        } else {
            setTasks(res.data.task || []);
        }
        setIsFetching(false);
    }, []);

    const filterTasks = useCallback(async (filters) => {
        setIsFetching(true);
        const res = await findTasksRequest(filters);
        if (res.error) {
            toast.error(res.description || "Error filtering tasks");
            setTasks([]);
        } else {
            setTasks(res.data.task || []);
        }
        setIsFetching(false);
    }, []);

    const deleteTask = useCallback(async (tid) => {
        const res = await deleteTaskRequest(tid);
        if (res.error) {
            toast.error(res.description || "Error deleting task");
        } else {
            toast.success("Task deleted!");
            getTasksFunction(); // Actualiza la lista
        }
    }, [getTasksFunction]);

    useEffect(() => {
        getTasksFunction();
    }, [getTasksFunction]);

    return {
        tasks,
        isFetching,
        getTasks: getTasksFunction,
        filterTasks,
        deleteTask
    };
};
