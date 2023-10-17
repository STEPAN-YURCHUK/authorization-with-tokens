import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from 'src/token/models/token.model';
import { User } from 'src/user/models/user.model';

@Injectable()
export class TokenService {

    constructor(
        @InjectModel(Token) private tokenRepository: typeof Token,
        private jwtService: JwtService
    ) { }

    async refresh(refresh_token: string) {
        if (!refresh_token) {
            throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

    async saveToken(userId: number, refresh_token: string) {
        const tokenData = await this.tokenRepository.findOne({ where: { userId } });
        if (tokenData) {
            tokenData.refresh_token = refresh_token;
            return tokenData.save();
        }
        const token = await this.tokenRepository.create({ userId, refresh_token });
        return token;
    }

    async removeToken(refresh_token: string) {
        const token = await this.tokenRepository.findOne({ where: { refresh_token } });
        token.destroy();
    }

    async findToken(refresh_token: string) {
        const token = await this.tokenRepository.findOne({ where: { refresh_token } });
        return token;
    }

    async validateAccessToken(token: string) {
        try {
            const userData = await this.jwtService.verify(token, {secret: process.env.JWT_ACCESS_SECRET});
            return userData;
        } catch (e) {
            return null;
        }
    }

    async validateRefreshToken(token: string) {
        try {
            const userData = await this.jwtService.verify(token, {secret: process.env.JWT_REFRESH_SECRET});
            return userData;
        } catch (e) {
            return null;
        }
    }

    generateToken(user: User) {
        const payload = { id: user.id, email: user.email };
        return {
			access_token: this.jwtService.sign(payload, { expiresIn: '30m', secret: process.env.JWT_ACCESS_SECRET }),
			refresh_token: this.jwtService.sign(payload, { expiresIn: '30d', secret: process.env.JWT_REFRESH_SECRET }),
		};
    }

}
