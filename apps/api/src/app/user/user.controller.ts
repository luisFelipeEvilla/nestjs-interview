import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: User,  description: 'User created successfully' })
  create(
    @Req() req: { user: User },
    @Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, req.user.role);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: User, isArray: true, description: 'List of all users' })
  findAll(@Req() req: { user: User }) {
    return this.userService.findAll(req.user.role);
  }

  @Get(':id')
    @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: User, description: 'User found successfully' })
  @ApiParam({ name: 'id', type: Number })
  findOne(
    @Req() req: { user: User },
    @Param('id') id: ParseIntPipe) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: User, description: 'User updated successfully' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Req() req: { user: User },
    @Param('id') id: ParseIntPipe, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto, req.user.role);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: User, description: 'User removed successfully' })
  @ApiParam({ name: 'id', type: Number })
  remove(
    @Req() req: { user: User },
    @Param('id') id: ParseIntPipe) {
    return this.userService.remove(+id, req.user.role);
  }
}
