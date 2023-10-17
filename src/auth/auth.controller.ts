import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { SignInUserDto } from './dto/signIn-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Response, Request } from 'express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService) {

    }

    @Post('/signIn')
    async signIn(@Body() dto: SignInUserDto, @Res() res: Response) {
        const user = await this.authService.signIn(dto);
        res.cookie('refreshToken', user.token.refresh_token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        return res.json(user);
    }

    @Post('/checkIn')
    async checkIn(@Body() dto: CreateUserDto, @Res() res: Response) {
        const user = await this.authService.checkIn(dto);
        res.cookie('refreshToken', user.token.refresh_token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        return res.json(user);
    }

    @Get('/logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        const { refreshToken } = req.cookies;
        await this.authService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.status(200).json();
    }

    @Get('/refresh')
    async refresh(@Req() req: Request, @Res() res: Response) {
        const { refreshToken } = req.cookies;
        const user = await this.authService.refresh(refreshToken);
        res.cookie('refreshToken', user.token.refresh_token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        return res.json(user);
    }
    
}
