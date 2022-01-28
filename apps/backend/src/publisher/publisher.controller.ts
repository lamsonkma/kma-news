import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('publishers')
@ApiTags('publisher')
@ApiBearerAuth()
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publisherService.create(createPublisherDto);
  }

  @Get()
  findAll() {
    return this.publisherService.findAll();
  }

  @Get(':hostname')
  findOne(@Param('hostname') hostname: string) {
    return this.publisherService.findOne(hostname);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':hostname')
  update(
    @Param('hostname') hostname: string,
    @Body() updatePublisherDto: UpdatePublisherDto
  ) {
    return this.publisherService.update(hostname, updatePublisherDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':hostname')
  remove(@Param('hostname') hostname: string) {
    return this.publisherService.remove(hostname);
  }
}
