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
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Enterprise } from './entities/enterprise.entity';

@Controller('enterprise')
@ApiTags('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}
  
  @ApiOkResponse({ type: Enterprise,  description: 'Enterprise created successfully' })
  @Post()
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseService.create(createEnterpriseDto);
  }

  @ApiOkResponse({ type: Enterprise, isArray: true, description: 'List of all enterprises' })
  @Get()
  findAll() {
    return this.enterpriseService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Enterprise, description: 'Enterprise details' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: ParseIntPipe) {
    return this.enterpriseService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Enterprise, description: 'Enterprise updated' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id') id: ParseIntPipe,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ) {
    return this.enterpriseService.update(+id, updateEnterpriseDto);
  }

  @ApiOkResponse({ type: Enterprise, description: 'Enterprise deleted' })
  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  remove(@Param('id') id: ParseIntPipe) {
    return this.enterpriseService.remove(+id);
  }
}
