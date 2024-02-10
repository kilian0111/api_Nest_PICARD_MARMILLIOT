import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import Movie from './movie.model/movie.interface';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class MovieService {
    constructor(@InjectModel('Movie') private readonly MovieModule: Model<Movie>) {}
    async create(movie: Movie): Promise<Movie> {
        try {
            return await this.MovieModule.create(movie);
        }catch (error){
            throw new HttpException('erreur', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<Movie[]> {
        try {
            return this.MovieModule.find({ isDeleted: false });
        }catch (error) {
            throw new HttpException('erreur', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOne(id: string): Promise<Movie> {
        const movie: Movie | null = await this.MovieModule.findById( id);
        if (!movie || movie.isDeleted) {
            throw new HttpException('aucun film', HttpStatus.NOT_FOUND);
        }
        return this.MovieModule.findOne({ _id: id, isDeleted: false });
    }

    async remove(id: string) {
        const movie: Movie | null = await this.MovieModule.findById(id);
        if (!movie || movie.isDeleted) {
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
        const movieToModify: Movie = await this.MovieModule.findById(id);
        if (!movieToModify && movieToModify.isDeleted) {
            throw new HttpException('aucun film', HttpStatus.NOT_FOUND);
        }
        await this.MovieModule.updateOne({ _id: id }, movie);
        return this.MovieModule.findById(id);
    }
}
