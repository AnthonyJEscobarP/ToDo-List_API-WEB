import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getTaskDetails as getTaskDetailsRequest } from '../services/api.jsx';

export const useTaskDetails = () => {
    const [taskDetails, setTaskDetails] = useState(null);

    const getTaskDetails = useCallback(async (tid) => {
        try {
            const response = await getTaskDetailsRequest(tid);
            if (response.error) {
                return toast.error(response.e?.response?.data || "Failed to get task details");
            }
            setTaskDetails(response.data);
        } catch (err) {
            toast.error(err.data || "Failed to get task details");
        }
    }, []);

    return {
        taskDetails,
        isFetching: !taskDetails || !taskDetails.pid,
        getTaskDetails
    };
};
