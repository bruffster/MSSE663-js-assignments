import { Schema, model } from 'mongoose';
import { TasksModel, STATUS_TYPES } from './task.model';

const statusTypes = Object.values(STATUS_TYPES);

const TasksSchema = new Schema<TasksModel>({
	name: {
		type: String,
		required: 'A task name is required to create a new task',
	},
	created_date: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: [
			{
				type: String,
				enum: [...statusTypes],
			},
		],
		default: [STATUS_TYPES.PENDING],
	},
});

export const Tasks = model('Tasks', TasksSchema);
