import mongoose from 'mongoose';
import { Todo } from '../../types';
const { Schema } = mongoose;


const todoSchema = new Schema<Todo>({
    text: { type: String, required: true },
    deleted: Boolean
});

export const TodoModel = mongoose.model('todo', todoSchema);