import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { WatchListService } from './watch-list.service';

@Controller('watchlist')
export class WatchListController {
    constructor(private readonly watchListService: WatchListService) {}

    @Get(':userId')
    async getWatchListByUserId(@Param('userId') userId: string): Promise<string[]> {
        return this.watchListService.getWatchListByUserId(userId);
    }

    @Get(':id/watched-count')
    async getCountUsersWhoWatchedMovie(@Param('id') id: string): Promise<Number> {
        return this.watchListService.getCountUsersWhoWatchedMovie(id);
    }

    @Post(':userId/:movieId')
    async addToWatchList(
        @Param('userId') userId: string,
        @Param('movieId') movieId: string,
    ): Promise<void> {
        return this.watchListService.addToWatchList(userId, movieId);
    }

    @Delete(':userId/:movieId')
    async removeFromWatchList(
        @Param('userId') userId: string,
        @Param('movieId') movieId: string,
    ): Promise<void> {
        return this.watchListService.removeFromWatchList(userId, movieId);
    }
}
