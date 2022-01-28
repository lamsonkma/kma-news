import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { SlugHelper } from '../common/helpers/slug.helper';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, SlugHelper],
  imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}
