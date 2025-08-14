import Task from "../models/task.model.js"

export const taskFound = async (tid = " ") => {
    const found = await Task.findById(tid);
    if (!found) {
        throw new Error(`The task provided doesnt exists`);
    }
};

export const validStatus = async (status = " ") => {
    if (status !== "INCOMPLETE" || status !== "COMPLETE" || status !== "DUE") {
        throw new Error(`The status provided is not valid, it must be either 'INCOMPLETE', 'COMPLETE' or 'DUE'`);
    }
};