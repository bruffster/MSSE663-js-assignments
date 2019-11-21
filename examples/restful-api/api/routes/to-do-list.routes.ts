import {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
} from "../controllers";
import express = require("express");

export const todoRoutes = express.Router();
/**
 * Express routes fro Tasks.
 *
 * RESTful endpoints make for easiily adding to existing API features.
 */

/**
 * Routes for all tasks. Evaluates to `/tasks/`.
 */
todoRoutes.get("/", getAllTasks).post("/", createTask);

/**
 * Routes for a task by id. Evalutes to `/tasks/:taskId`.
 */
todoRoutes
  .get("/:taskId", getTask)
  .post("/:taskId", updateTask)
  .delete("/:taskId", deleteTask);
