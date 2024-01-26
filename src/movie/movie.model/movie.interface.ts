import { Document } from 'mongoose';

export default interface Movie extends Document {
    title: string;
    author: string;
    synopsis: string;
    category: string;
    dateCreated: Date;
    isDeleted: boolean;
}
