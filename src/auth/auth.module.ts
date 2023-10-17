import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import * as dotenv from 'dotenv';
import { TokenModule } from 'src/token/token.module';
dotenv.config();


@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        JwtModule,
        UserModule,
        TokenModule,
    ],
})

export class AuthModule {}
