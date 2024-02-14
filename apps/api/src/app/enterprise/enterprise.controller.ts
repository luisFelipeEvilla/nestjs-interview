import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
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

  @ApiOkResponse({ type: Enterprise, description: 'Enterprise details' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enterpriseService.findOne(+id);
  }

  @ApiOkResponse({ type: Enterprise, description: 'Enterprise updated' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ) {
    return this.enterpriseService.update(+id, updateEnterpriseDto);
  }

  @ApiOkResponse({ type: Enterprise, description: 'Enterprise deleted' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enterpriseService.remove(+id);
  }
}
