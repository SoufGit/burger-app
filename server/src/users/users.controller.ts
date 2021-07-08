import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
// import { User } from './interface/user.interface';
import { AddUserDto } from './dto/add-user.dto';
import { User } from './schemas/user.schema';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { };

    @Get()
    async getUserList(@Res() res): Promise<User[]> {

        const userList = await this.usersService.getUserList();

        if (res.statusCode === HttpStatus.OK) {
            return res.status(HttpStatus.OK).json(userList);
        }
    }

    @Get(':id')
    async getUserById(@Res() res, @Param('id') id: string) {
        const userFound = await this.usersService.getUserById(id);
        if (!userFound) throw new NotFoundException('Id does not exist!');
        return res.status(HttpStatus.OK).json(userFound);
        //return this.usersService.getUserById(id);
    };

    @Patch(':id')
    async updateUser(@Res() res, @Param('id') id: string, @Body() userUpdated: User) {
        console.log('userUpdateduserUpdated', userUpdated);
        this.usersService.updateUser(id, userUpdated);
        return res.status(HttpStatus.OK).json({
            message: "UPDATED has been added successfully",
        });
    };

    @Post()
    async addUser(@Res() res, @Body() addUserDto: AddUserDto) {
        const { password } = addUserDto;
        const hashedPassword = await bcrypt.hash(password, 12);
        addUserDto = {
            ...addUserDto,
            password: hashedPassword
        };
        console.log('addUserDtoaddUserDtoaddUserDto', addUserDto);
        const userAdded = await this.usersService.addUser(addUserDto);
        console.log('userAddeduserAdded', userAdded);
        return res.status(HttpStatus.OK).json({
            message: "Post has been added successfully",
            addedUser: 1,
            userAdded
        });
        // await this.usersService.createUser(createUserDto);
    }

    @Delete(':id')
    deleteUser(@Res() res, @Param('id') id: string) {
        if (res.statusCode === HttpStatus.OK) {
            this.usersService.deleteUser(id);
            return res.status(HttpStatus.OK).json({
                message: "Delete has been added successfully"
            });
        }
    };
};
