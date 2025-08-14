import { Router } from "express";
import { createTask, findTasks, editTask, deleteTask } from "../controllers/task.controller.js";
import { createTaskValidator, findTasksValidator, editTaskValidator, deleteTaskValidator } from "../middlewares/task-validators.js";

const router = Router();

/**
 * @swagger
 * /task/createTask:
 *   post:
 *     tags:
 *       - Task
 *     summary: Create a new task
 *     description: Creates a new task with title, description, due date, and default status INCOMPLETE.
 *     operationId: createTask
 *     requestBody:
 *       description: Task data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Finish Project"
 *               description:
 *                 type: string
 *                 example: "Complete the API integration for the project."
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-15"
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       500:
 *         description: Server error during task creation.
 */
router.post("/createTask", createTaskValidator, createTask);

/**
 * @swagger
 * /task/findTasks:
 *   post:
 *     tags:
 *       - Task
 *     summary: Find tasks using filters
 *     description: Search tasks using optional filters such as title, creation date, due date, status, or ID.
 *     operationId: findTasks
 *     requestBody:
 *       description: Filters to apply
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tid:
 *                 type: string
 *               title:
 *                 type: string
 *               created:
 *                 type: string
 *                 format: date
 *               dueDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: ["INCOMPLETE", "COMPLETE", "DUE"]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results to return.
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of results to skip for pagination.
 *     responses:
 *       200:
 *         description: Filtered tasks retrieved successfully.
 *       500:
 *         description: Error while searching for tasks.
 */
router.post("/findTasks", findTasksValidator, findTasks);

/**
 * @swagger
 * /task/editTask/{tid}:
 *   put:
 *     tags:
 *       - Task
 *     summary: Edit a task
 *     description: Update task information by ID.
 *     operationId: editTask
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to edit.
 *     requestBody:
 *       description: Task data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: ["INCOMPLETE", "COMPLETE", "DUE"]
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       400:
 *         description: Task not found or invalid data.
 *       500:
 *         description: Error updating task.
 */
router.put("/editTask/:tid", editTaskValidator, editTask);

/**
 * @swagger
 * /task/deleteTask/{tid}:
 *   delete:
 *     tags:
 *       - Task
 *     summary: Delete a task
 *     description: Delete a task by ID.
 *     operationId: deleteTask
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to delete.
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       400:
 *         description: Task not found.
 *       500:
 *         description: Error deleting task.
 */
router.delete("/deleteTask/:tid", deleteTaskValidator, deleteTask);

export default router;
