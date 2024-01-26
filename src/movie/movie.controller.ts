import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MovieService } from './movie.service';
import Movie from './movie.model/movie.interface';

@Controller('movie')
export class MovieController {
    constructor(private movieService: MovieService) {}
    @Get()
    async getAllMovie(@Req() req: Request, @Res() res: Response) {
        try {
            const movies: Movie[] = await this.movieService.findAll();
            res.status(HttpStatus.OK).json(movies).send();
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }

    @Post()
    async createMovie(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: Movie,
    ) {
        try {
            const movieCreated: Movie = await this.movieService.create(body);
            res.status(HttpStatus.OK).json(movieCreated).send();
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        try {
            const movie: Movie = await this.movieService.findOne(id);
            res.status(HttpStatus.OK).json(movie).send();
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        try {
            await this.movieService.remove(id);
            res.status(HttpStatus.OK).send();
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: Movie,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        try {
            const movie: Movie = await this.movieService.update(id, body);
            res.status(HttpStatus.OK).json(movie).send();
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
}
