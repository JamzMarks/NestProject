import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { updateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/decorators/serialize.decorator';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: createUserDto) {
    this.userService.create(body.email, body.password);
  }

  
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    console.log('handler is running')
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: updateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    this.userService.remove(parseInt(id));
  }
}
