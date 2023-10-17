import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './models/token.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
    providers: [TokenService],
    exports: [TokenService],
    imports: [JwtModule, SequelizeModule.forFeature([Token])]
})

export class TokenModule {}
