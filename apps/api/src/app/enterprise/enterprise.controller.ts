import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Enterprise } from './entities/enterprise.entity';
import { AuthGuard } from '@nestjs/passport';
import { role } from '@prisma/client';
import { User } from '../user/entities/user.entity';

@Controller('enterprise')
@ApiTags('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  @ApiOkResponse({
    type: Enterprise,
    description: 'Enterprise created successfully',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Req() req: { user: User },
    @Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseService.create(createEnterpriseDto, req.user.role);
  }

  @Get()
  @ApiOkResponse({
    type: Enterprise,
    isArray: true,
    description: 'List of all enterprises',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.enterpriseService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Enterprise, description: 'Enterprise details' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: Number })
  findOne(
    @Req() req: { user: User },
    @Param('id') id: ParseIntPipe
  ) {
    return this.enterpriseService.findOne(+id, req.user.role);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: Enterprise, description: 'Enterprise updated' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Req() req: { user: User },
    @Param('id') id: ParseIntPipe,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ) {
    return this.enterpriseService.update(+id, updateEnterpriseDto, req.user.role);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: Enterprise, description: 'Enterprise deleted' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Req() req: { user:  User }, @Param('id') id: ParseIntPipe) {
    return this.enterpriseService.remove(+id, req.user.role);
  }
}
