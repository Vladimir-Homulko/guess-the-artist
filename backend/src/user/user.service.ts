import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model, Types } from 'mongoose';
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

  public async findOne(baseUserDto: BaseUserDto): Promise<UserDocument> {
    return this.userModel.findOne(baseUserDto).exec();
  }

  public async findById(id: Types.ObjectId): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const user = this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async findOneOrCreate(
    baseUserDto: BaseUserDto,
  ): Promise<UserDocument> {
    const user = await this.findOne(baseUserDto);
    if (!user) {
      return this.create(baseUserDto);
    }

    return user;
  }

  public async getTopPlayers(): Promise<Array<UserDocument>> {
    return this.userModel.find().sort({ points: -1 }).limit(3).exec();
  }
}
