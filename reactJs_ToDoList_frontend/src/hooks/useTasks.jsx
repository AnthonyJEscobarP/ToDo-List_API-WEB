import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { findTasks as findTasksRequest } from '../services/api.jsx';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const getTasksFunction = useCallback(async () => {
        setIsFetching(true);
        const tasksData = await findTasksRequest();

        if (tasksData.error) {
            toast.error(tasksData.e?.response?.data || "Error fetching tasks");
            setIsFetching(false);
            return;
        }
        setTasks(tasksData.data.task);
        setIsFetching(false);
    }, []);

    const filterTasks = useCallback(async (filters) => {
        setIsFetching(true);
        const tasksData = await findTasksRequest(filters);
        if (tasksData.error) {
            toast.error(tasksData.e?.response?.data || "Error filtering tasks");
            setIsFetching(false);
            return;
        }
        setTasks(tasksData.data?.task);
        setIsFetching(false);
    }, []);

    useEffect(() => {
        getTasksFunction();
    }, [getTasksFunction]);

    return {
        getTasks: getTasksFunction,
        tasks,
        isFetching,
        filterTasks
    };
};