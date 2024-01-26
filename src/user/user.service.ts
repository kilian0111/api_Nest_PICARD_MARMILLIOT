import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import User from './user.model/user.interface';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModule: Model<User>) {}
  async create(user: User): Promise<User> {
    user.password = await this.hashPassword(user.password);
    return await this.UserModule.create(user);

  }

  async findAll(): Promise<User[]> {
    return this.UserModule.find({ isDeleted: false }, { password: 0 });
  }

  findOne(id: string): Promise<User> {
    return this.UserModule.findOne({ _id: id, isDeleted: false }, { password: 0 });
  }

  async remove(id: string) {
    if (await this.UserModule.findById(id) === null) {
      throw new HttpException('aucun user', HttpStatus.NOT_FOUND);
    }
    await this.UserModule.updateOne(
      { _id: id },
      {
        isDeleted: true,
        firstname: 'unknown',
        lastname: 'unknown',
        email: 'unknown',
        password: 'unknown',
      },
    );
  }

  async update(id: string, user: User): Promise<User> {
    if (user._id) {
      delete user._id;
    }
    const userToModify: User[] = await this.UserModule.find({
      _id: id,
      isDeleted: false,
    });
    if (!userToModify && userToModify.length === 0) {
      throw new HttpException('aucun user', HttpStatus.NOT_FOUND);
    }
    if (user.password) {
      user.password = await this.hashPassword(user.password);
    }

    await this.UserModule.updateOne({ _id: id }, user);
    return this.UserModule.findById(id);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

}
