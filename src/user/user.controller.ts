import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  DeleteUserBulk,
  UpdateUserDto,
  createBookArrayDto,
} from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getAllUser() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.userService.findUser(id);
  }

  @Post('/post')
  postUser(@Body() payload: CreateUserDto) {
    return this.userService.postUser(payload);
  }

  @Post('/post/bulk')
  postBulk(@Body() payload: createBookArrayDto) {
    return this.userService.bulkCreate(payload);
  }

  @Put('/update/:id')
  updateUser(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.userService.updateUser(Number(id), payload);
  }

  @Delete('/delete/:id')
  deleteUserBulk(@Param('id') id: number) {
    return this.userService.deleteUser(Number(id));
  }

  @Delete('/delete/bulk')
  deleteBulk(@Body() payload: DeleteUserBulk) {
    return this.userService.deleteBulk(payload);
  }
}
