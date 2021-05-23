import { Task } from "../models/to-do-list.model";

export const getAllTasks = (req: any, res: any) => {
  Task.find({}, function(err, tasks) {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  })
};
export const getTask = () => {};
export const createTask = () => {};
export const deleteTask = () => {};