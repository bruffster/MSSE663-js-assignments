import { Schema, model, Model, Document } from "mongoose";

const TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task',
  },
  Created_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: [
      {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
      },
    ],
    default: ['pending'],
  },
});

export const Task = model('Task', TaskSchema);