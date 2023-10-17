import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User) {

    }

    async create(dto: CreateUserDto) {
        return await this.userRepository.create(dto)
    }

    async findAll() {
        return await this.userRepository.findAll({ attributes: ['id', 'email', 'first_name', 'last_name'], include: {all: true} });
    }

    async findOne(id: number) {
        const user = await this.userRepository.findByPk(id, { attributes: ['id', 'email', 'first_name', 'last_name'] });
        if (!user) {
            throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async findOneByEmail(email: string) {
        return await this.userRepository.findOne({ where: { email } });
    }

    async update(dto: UpdateUserDto) {
        const user = await this.findOne(dto.id);
        const dataForUpdate: any = {};
        if (dto.first_name) {
            dataForUpdate.first_name = dto.first_name;
        }
        if (dto.last_name) {
            dataForUpdate.last_name = dto.last_name;
        }
        await user.update(dataForUpdate);
        const transformUser = this.transformUser(user);
        return { user: transformUser };
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
        }
        await user.destroy();
    }

    transformUser(user: User) {
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        };
    }

}

