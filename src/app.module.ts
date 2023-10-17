import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/models/user.model';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { Token } from './token/models/token.model';
import { TokenModule } from './token/token.module';
dotenv.config();

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Token],
            autoLoadModels: true
        }),
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        UserModule,
        AuthModule,
        TokenModule,
    ],
})

export class AppModule {}
