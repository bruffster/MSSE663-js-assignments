import { defaultCallback, optsCallback } from "./controllers.util";
import { Tasks } from "../models/to-do-list.model";

export const getAllTasks = (req: any, res: any) => {
  Tasks.find({}, defaultCallback(req, res));
};

export const getTask = (req: any, res: any) => {
  Tasks.findById(req.params.taskId, defaultCallback(req, res));
};

export const createTask = (req: any, res: any) => {
  const newTask = new Tasks({
    name: req.body.name
  });
  newTask.save(defaultCallback(req, res));
};

export const updateTask = (req: any, res: any) => {
  Tasks.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    defaultCallback(req, res)
  );
};

export const deleteTask = (req: any, res: any) => {
  Tasks.deleteOne(
    { _id: req.params.taskId },
    optsCallback(req, res)({ msg: "Deleted successfully." })
  );
};
