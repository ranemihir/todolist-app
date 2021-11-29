import mongoose from 'mongoose';
import { User } from '../../../types';
const { Schema } = mongoose;


const userSchema = new Schema<User>({
    googleId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photoUrl: { type: String, required: true },
    tokenId: { type: String, required: true }
});

export const UserModel = mongoose.model('user', userSchema);