import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({ type: User,  description: 'User created successfully' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: User, isArray: true, description: 'List of all users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: User, description: 'User found successfully' })
  findOne(@Param('id') id: ParseIntPipe) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: User, description: 'User updated successfully' })
  update(@Param('id') id: ParseIntPipe, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: User, description: 'User removed successfully' })
  remove(@Param('id') id: ParseIntPipe) {
    return this.userService.remove(+id);
  }
}
