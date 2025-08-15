import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getTaskDetails as getTaskDetailsRequest } from '../services/api.jsx';

export const useTaskDetails = () => {
    const [taskDetails, setTaskDetails] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const getTaskDetails = useCallback(async (tid) => {
        setIsFetching(true);
        const response = await getTaskDetailsRequest(tid);
        if (response.error) {
            toast.error(response.description);
            setTaskDetails(null);
        } else {
            setTaskDetails(response.data);
        }
        setIsFetching(false);
    }, []);

    return {
        taskDetails,
        isFetching,
        getTaskDetails
    };
};
