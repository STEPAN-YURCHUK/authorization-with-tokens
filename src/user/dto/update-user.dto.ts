import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {

    @ApiProperty({ example: '1', description: 'id user' })
    @IsNotEmpty()
    @IsNumber()
    id: number

    @ApiProperty({ example: 'Stepan', description: 'first name' })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(80)
    first_name?: string;

    @ApiProperty({ example: 'Yurchuk', description: 'last name' })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(80)
    last_name?: string;

}
