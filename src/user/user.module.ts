import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { AuthService } from 'src/auth/auth.service';
import { TokenService } from 'src/token/token.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from 'src/token/token.module';

@Module({
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule,
    ]
})

export class UserModule {}
