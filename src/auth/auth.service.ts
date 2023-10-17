import { TokenService } from './../token/token.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/signIn-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/models/user.model';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService, 
        private tokenService: TokenService
    ) { }

    async signIn(dto: SignInUserDto) {
        try {
            const user = await this.validateUser(dto);
            return await this.generateTokenAndTransformUser(user);
        } catch {
            throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

    async checkIn(dto: CreateUserDto) {
        const candidate = await this.userService.findOneByEmail(dto.email);
		if (candidate) {
			throw new HttpException('user_exists', HttpStatus.CONFLICT);
		}
		const hashPassword = await bcrypt.hash(dto.password, 5);
        dto.password = hashPassword;
		const user = await this.userService.create(dto);
		return await this.generateTokenAndTransformUser(user);
    }

    async logout(refresh_token: string) {
        await this.tokenService.removeToken(refresh_token);
    }

    async refresh(refresh_token: string) {
        if (!refresh_token) {
            throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
        }
        const userData = await this.tokenService.validateRefreshToken(refresh_token);
        const tokenFromDb = await this.tokenService.findToken(refresh_token);
        if (!userData || !tokenFromDb) {
            throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
        }
        const user = await this.userService.findOne(userData.id);
        return await this.generateTokenAndTransformUser(user);
    }

    async validateUser(dto: SignInUserDto) {
        const user = await this.userService.findOneByEmail(dto.email);
        const passwordEquals = await bcrypt.compare(dto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }

    private async generateTokenAndTransformUser(user: User) {
        const token = this.tokenService.generateToken(user);
        await this.tokenService.saveToken(user.id, token.refresh_token);
        const transformedUser = this.userService.transformUser(user);
        return { user: transformedUser, token };
    }
    
}
