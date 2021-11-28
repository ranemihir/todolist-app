import mongoose from 'mongoose';
import { User } from '../types';
const { Schema } = mongoose;


const userSchema = new Schema<User>({
    firstName: String,
    lastName: String,
    email: String,
    photoUrl: String
});

export const UserModel = mongoose.model('User', userSchema);