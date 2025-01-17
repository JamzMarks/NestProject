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
  Session,
  UseGuards
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { updateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User){
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any){
    session.userId = null;
  }
  
  @Post('/signup')
  async createUser(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  } 

  @Post('/signin')
  async signin(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password)
    session.userId = user.id;
    return user;
  }

  
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    // console.log('handler is running')
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
