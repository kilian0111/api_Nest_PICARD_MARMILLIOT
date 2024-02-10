import { Module } from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import {WatchListController} from "./watch-list.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../user/user.model/user.model";
import {MovieSchema} from "../movie/movie.model/movie.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }])],
  controllers: [WatchListController],
  providers: [WatchListService]
})
export class WatchListModule {}
