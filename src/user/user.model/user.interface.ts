import { Document } from 'mongoose';

export default interface User extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dateCreated: Date;
  isDeleted: boolean;
  watchMovie: string[];
}
