import { body, param } from "express-validator";
import { taskFound,validStatus } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const createTaskValidator = [
    body("title").notEmpty().withMessage("Task title is required").isString().withMessage("Task title must be a text"),
    body("description").notEmpty().withMessage("Task description is required").isString().withMessage("Task description must be a text"),
    body("dueDate").notEmpty().withMessage("Due date is required"),
    validateFields,
    handleErrors
];

export const findTasksValidator = [
    body("tid").optional().isMongoId().withMessage("The id provided is not valid").custom(taskFound),
    body("title").optional().isString().withMessage("Task title must be a text"),
    body("created").optional(),
    body("dueDate").optional(),
    body("status").optional().custom(validStatus),
    validateFields,
    handleErrors
];

export const editTaskValidator = [
    param("tid").notEmpty().isMongoId().withMessage("The id provided is not valid").custom(taskFound),
    body("title").optional().isString().withMessage("Task title must be a text"),
    body("description").optional().isString().withMessage("Task description must be a text"),
    body("dueDate").optional(),
    body("status").optional().custom(validStatus),
    validateFields,
    handleErrors
];

export const deleteTaskValidator = [
    param("tid").notEmpty().isMongoId().withMessage("The id provided is not valid").custom(taskFound),
    validateFields,
    handleErrors
];
