import { model, Schema } from 'mongoose';

export interface Task {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

const schema = new Schema<Task>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  completed: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now() },
});

export const TaskModel = model('tasks', schema);
