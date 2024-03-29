import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WatchListModule } from './watch-list/watch-list.module';
import {MovieModule} from "./movie/movie.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://ObiJuan:ObiJuan@mongodb:27017/movie?authSource=admin',
    ),
    UserModule,
    WatchListModule,
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
