import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import Movie from './movie.model/movie.interface';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class MovieService {
    constructor(@InjectModel('Movie') private readonly MovieModule: Model<Movie>) {}
    async create(movie: Movie): Promise<Movie> {
        return await this.MovieModule.create(movie);
    }

    async findAll(): Promise<Movie[]> {
        return this.MovieModule.find({ isDeleted: false });
    }

    findOne(id: string): Promise<Movie> {
        return this.MovieModule.findOne({ _id: id, isDeleted: false });
    }

    async remove(id: string) {
        if (await this.MovieModule.findById(id) === null) {
            throw new HttpException('aucun film', HttpStatus.NOT_FOUND);
        }
        await this.MovieModule.updateOne(
            { _id: id },
            {
                isDeleted: true,
                title: 'unknown',
                author: 'unknown',
                synopsis: 'unknown',
            },
        );
    }

    async update(id: string, movie: Movie): Promise<Movie> {
        if (movie._id) {
            delete movie._id;
        }
        const movieToModify: Movie[] = await this.MovieModule.find({
            _id: id,
            isDeleted: false,
        });
        if (!movieToModify && movieToModify.length === 0) {
            throw new HttpException('aucun film', HttpStatus.NOT_FOUND);
        }

        await this.MovieModule.updateOne({ _id: id }, movie);
        return this.MovieModule.findById(id);
    }
}
