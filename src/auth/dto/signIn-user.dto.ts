import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInUserDto {

    @ApiProperty({ example: 'user@gmail.com', description: 'email' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '12345678', description: 'password' })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(80)
    password: string;
    
}