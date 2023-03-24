import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model, ObjectId } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseUserDto } from './dto/base-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async create(baseUserDto: BaseUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(baseUserDto);
    return createdUser.save();
  }

  public async getOne(baseUserDto: BaseUserDto): Promise<UserDocument> {
    return this.userModel.findOne(baseUserDto).exec();
  }

  public async getById(id: ObjectId): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
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

  public async getOneOrCreate(baseUserDto: BaseUserDto): Promise<UserDocument> {
    const user = await this.getOne(baseUserDto);
    if (!user) {
      return this.create(baseUserDto);
    }

    return user;
  }

  public async getTopPlayers(): Promise<Array<UserDocument>> {
    return this.userModel.find().sort({ points: 1 }).limit(3).exec();
  }
}
