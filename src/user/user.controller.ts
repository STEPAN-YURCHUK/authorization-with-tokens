import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {

    }

    @Get('/list')
    findAll() {
        return this.userService.findAll();
    }

    @Get('/one/:id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Put('/update')
    update(@Body() dto: UpdateUserDto) {
        return this.userService.update(dto);
    }

    @Delete('/remove/:id')
    remove(@Req() req: Request) {
        console.log(req)
        // return this.userService.remove(req.user.id);
    }

}
