import { Schema } from 'mongoose';
import User from './user.interface';

export const UserSchema = new Schema<User>({
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  dateCreated: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  watchMovie: { type: [String], default: [] },
});
