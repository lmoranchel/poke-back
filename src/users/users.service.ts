import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  saltOrRounds: number = 10;

  async create(createUserDto: CreateUserDto): Promise<string> {
    try {
      const hashPass = await bcrypt.hash(
        createUserDto.password,
        this.saltOrRounds,
      );

      const userData = {
        ...createUserDto,
        password: hashPass,
      };

      await this.userModel.create(userData);
      return 'Success';
    } catch (err) {
      return err.message;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username: username });
  }

  async addFavorite(userId: string, pokeId: string): Promise<string> {
    try {
      this.userModel.findByIdAndUpdate(userId, {
        $push: { favorite: pokeId },
      });

      return 'success';
    } catch (err) {
      return err.message;
    }
  }

  async removeFavorite(userId: string, pokeId: string): Promise<string> {
    try {
      this.userModel.findByIdAndUpdate(userId, {
        $pull: { favorite: pokeId },
      });

      return 'success';
    } catch (err) {
      return err.message;
    }
  }
}
