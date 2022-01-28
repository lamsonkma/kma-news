import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';

@Module({
  controllers: [OptionController],
  providers: [OptionService],
  imports: [TypeOrmModule.forFeature([Option])],
})
export class OptionModule {}
