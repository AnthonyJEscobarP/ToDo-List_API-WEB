import { Schema, model } from "mongoose";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


const taskSchema = Schema({
    title: {
        type: String,
        required: [true, "Task title is required"],
        maxLength: [80, "Task title cannot exceed 80 characters"]
    },
    description:{
        type: String,
        required: [true, "Task description is required"],
        maxLength: [255, "Task description cannot exceed 255 characters"]
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"]
    },
    status: {
        type: String,
        enum: ["COMPLETE", "INCOMPLETE","DUE"],
        default: "INCOMPLETE"
    }
},
    {
        versionKey: false,
        timestamps: true
    });


taskSchema.methods.toJSON = function () {
    const { __v, _id, ...taskDb } = this.toObject();
    taskDb.pid = _id;
    if (taskDb.dueDate) {
        taskDb.dueDate = format(new Date(taskDb.dueDate), "dd/MM/yyyy HH:mm", { locale: es });
    }
    if (taskDb.createdAt) {
        taskDb.createdAt = format(new Date(taskDb.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: es });
    }
    return taskDb;
};


export default model("Task", taskSchema);
