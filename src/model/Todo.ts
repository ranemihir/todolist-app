import mongoose from 'mongoose';
import { Todo } from '../types';
const { Schema } = mongoose;


const todoSchema = new Schema<Todo>({
    text: String,
    deleted: Boolean
});

export const TodoModel = mongoose.model('User', todoSchema);