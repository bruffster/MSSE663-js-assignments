export interface TaskName {
	type: StringConstructor;
	required: string;
}

export interface CreationDate {
	type: Date;
	default: Date;
}

export interface TaskStatus {
	type: StatusType[];
	default: STATUS_TYPES[];
}

export interface StatusType {
	type: StringConstructor;
	enum: typeof STATUS_TYPES;
}

export interface TasksModel {
	name: TaskName;
	created_date: CreationDate;
	status: TaskStatus;
}

export enum STATUS_TYPES {
	PENDING = 'pending',
	ONGOING = 'ongoing',
	COMPLETED = 'completed',
}
