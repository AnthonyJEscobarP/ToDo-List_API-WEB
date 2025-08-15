import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;

        const today = new Date();
        if (new Date(dueDate) <= today) {
            return res.status(400).json({
                message: "Due date must be a future date"
            });
        }

        const task = await Task.create({ title, description, dueDate });

        return res.status(201).json({
            message: "Task created succesfully",
            task
        });
    } catch (err) {
        return res.status(500).json({
            message: "Task creation failed,check the information",
            error: err.message
        });
    }
};

export const findTasks = async (req, res) => {
    try {
        const { limit = 10, from = 0 } = req.query;
        const { tid, title, created, dueDate, status } = req.body || {};;

        let filterParameter = {};

        if (tid) filterParameter._id = tid;
        if (title) filterParameter.title = { $regex: title, $options: "i" };

        if (created) {
            const creation = new Date(created);
            const nextDay = new Date(creation);
            nextDay.setDate(creation.getDate() + 1);

            filterParameter.createdAt = {
                $gte: creation,
                $lt: nextDay
            };
        }
        if (dueDate) {
            const due = new Date(dueDate);
            const nextDay = new Date(due);
            nextDay.setDate(due.getDate() + 1);

            filterParameter.dueDate = {
                $gte: due,
                $lt: nextDay
            };
        }

        if (status) filterParameter.status = status;

        const today = new Date();
        await Task.updateMany(
            { dueDate: { $lt: today }, status: { $ne: "COMPLETE" } },
            { $set: { status: "DUE" } }
        );

        const [total, task] = await Promise.all([
            Task.countDocuments(filterParameter),
            Task.find(filterParameter)
                .skip(Number(from))
                .limit(Number(limit))
                .sort({ dueDate: 1 })
        ]); 

        if (total === 0) {
            return res.status(200).json({
                success: true,
                message: "Ups nothing here"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task found successfully",
            total,
            task
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to list the tasks you need",
            error: err.message,
        });
    }
};


export const editTask = async (req, res) => {
    try {
        const { tid } = req.params;
        const {newData} = req.body; 
        //title, description, dueDate,status
        
        const found = await Task.findById(tid);
        if (!found) {
            return res.status(400).json({
                success: false,
                message: "Task not found"
            });
        };

        const task = await Task.findByIdAndUpdate(tid, newData, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Task changes updated succesfully',
            task
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'failed to update task changes, try again later',
            error: err.message
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { tid } = req.params;

        const found = await Task.findById(tid);
        if (!found) {
            return res.status(400).json({
                success: false,
                message: "Task not found"
            });
        };

        await Post.findByIdAndDelete(tid);

        return res.status(200).json({
            success: true,
            message: "task deleted successfully ",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "failed to delete task",
            error: err.message
        });
    }
};