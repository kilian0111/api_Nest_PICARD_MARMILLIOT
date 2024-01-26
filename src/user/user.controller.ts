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
import { UserService } from './user.service';
import User from './user.model/user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getAllUser(@Req() req: Request, @Res() res: Response) {
    try {
      const users: User[] = await this.userService.findAll();
      res.status(HttpStatus.OK).json(users).send();
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Post()
  async createUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: User,
  ) {
    try {
      const userCreated: User = await this.userService.create(body);
      res.status(HttpStatus.OK).json(userCreated).send();
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
      const user: User = await this.userService.findOne(id);
      res.status(HttpStatus.OK).json(user).send();
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
      await this.userService.remove(id);
      res.status(HttpStatus.OK).send();
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: User,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user: User = await this.userService.update(id, body);
      res.status(HttpStatus.OK).json(user).send();
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
