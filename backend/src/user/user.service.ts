import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  public async update(
    id: ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const user = this.userModel.findByIdAndUpdate(id, updateUserDto);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async getTopPlayers(): Promise<Array<UserDocument>> {
    return this.userModel.find().sort({ points: 1 }).limit(3).exec();
  }
}
