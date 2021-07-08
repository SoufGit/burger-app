import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async getUserByUserName(userName: string) {
        const user = await this.usersService.findOne(userName);
        return user || null;
    }

    async validateUser(userName: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(userName);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login({ user }: any) {
        const payload = { userName: user.userName, sub: user._id };
        const access_token = this.jwtService.sign(payload);
        return {
            access_token
        };
    }

    hashPassword() {

    }
}