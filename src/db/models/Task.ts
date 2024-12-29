import {model, Schema} from "mongoose";

export interface Task {
    title: string;
}

const schema = new Schema<Task>({
    title: {type: String, required: true},
});

export const TaskModel = model("tasks", schema);