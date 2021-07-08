import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddUserDto } from './dto/add-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getUserById(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async findOne(userName: string): Promise<User> {
        //return await this.userModel.findOne(usr => usr.userName === userName);
        return await this.userModel.findOne({ userName: userName }).select({ email: 1, password: 1, userName: 1 }).lean();
        // return await this.userModel.exists({ userName: userName });
    }

    async getUserList(): Promise<User[]> {
        //console.log('UserUser', User);
        return this.userModel.find().exec();
    }

    async updateUser(id: string, addUserDto: AddUserDto): Promise<any> {
        return await this.userModel.findByIdAndUpdate(id, addUserDto, { new: true });
    }

    async addUser(addUserDto: AddUserDto): Promise<User> {
        const addUser = new this.userModel(addUserDto);
        return addUser.save();
    }

    async deleteUser(id: string): Promise<any> {
        return await this.userModel.findByIdAndDelete(id);
    }
}
