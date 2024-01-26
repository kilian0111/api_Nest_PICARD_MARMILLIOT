import { Schema } from 'mongoose';
import Movie from './movie.interface';

export const MovieSchema = new Schema<Movie>({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    author: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    synopsis: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    dateCreated: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
});
