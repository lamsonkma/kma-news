import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';

@Module({
  controllers: [PublisherController],
  providers: [PublisherService],
  imports: [TypeOrmModule.forFeature([Publisher])],
})
export class PublisherModule {}
