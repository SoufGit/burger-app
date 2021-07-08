import { Controller, Body, Get, Req, Post, UseGuards, Res, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Req() req: Request, @Res({ passthrough: true }) response) {
        const jwtToken = await this.authService.login(req);
        response.cookie('jwt', jwtToken, { httpOnly: true });
        return { message: jwtToken };
    }

    @Post('auth/logout')
    async logout(@Res({ passthrough: true }) response) {
        response.clearCookie('jwt');
        return { message: 'cookie cleared' };
    }

    //@UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req: Request) {
        try {
            const { access_token } = req.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(access_token);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.usersService.findOne(data.userName);
            if (!user) {
                throw new UnauthorizedException();
            }

            const { password, ...result } = user;
            return result;
        } catch (error) {
            console.log('errorerror', error);
            throw new UnauthorizedException();
        }
    }
}