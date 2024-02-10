import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import User from '../user/user.model/user.interface'
import Movie from '../movie/movie.model/movie.interface';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';


@Injectable()
export class WatchListService {

    constructor(@InjectModel('User') private readonly UserModule: Model<User>,
                @InjectModel('Movie') private readonly MovieModule: Model<Movie>) {
    }

    async getWatchListByUserId(userId: string) {
        const user: User = await this.UserModule.findById(userId, {password: 0});
        if (!user || user.isDeleted) {
            throw new HttpException('aucun utilisateur', HttpStatus.NOT_FOUND);
        }
        return user.watchMovie;
    }

    async getCountUsersWhoWatchedMovie(id: string) {
        const movie: Movie = await this.MovieModule.findById(id);
        if (!movie || movie.isDeleted ) {
            throw new HttpException('aucun film', HttpStatus.NOT_FOUND);
        }
        return await this.UserModule.countDocuments({watchMovie: movie._id});
    }

    async addToWatchList(userId: string, movieId: string) {

        const movie: Movie = await this.MovieModule.findById( movieId);
        if (!movie || movie.isDeleted ) {
            throw new HttpException('aucun film', HttpStatus.NOT_FOUND);
        }
        const user: User = await this.UserModule.findById( userId, {password: 0});
        if(!user || user.isDeleted) {
            throw new HttpException('aucun utilisateur', HttpStatus.NOT_FOUND);
        }
        if (user.watchMovie.includes(movieId)) {
            throw new HttpException('le film est déjà dans la liste', HttpStatus.BAD_REQUEST);
        }
        await this.UserModule.updateOne({_id: userId}, {$push: {watchMovie: movieId}});
    }

    async removeFromWatchList(userId: string, movieId: string) {
        const movie: Movie = await this.MovieModule.findById( movieId);
        if (!movie || movie.isDeleted ) {
            throw new HttpException('aucun film', HttpStatus.NOT_FOUND);
        }
        const user: User = await this.UserModule.findById( userId, {password: 0});
        if(!user || user.isDeleted) {
            throw new HttpException('aucun utilisateur', HttpStatus.NOT_FOUND);
        }
        if (!user.watchMovie.includes(movieId)) {
            throw new HttpException('le film n\'est pas dans la liste', HttpStatus.NOT_FOUND);
        }
        await this.UserModule.updateOne({_id: userId}, {$pull: {watchMovie: movieId}});
    }
}
