import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryController } from './controllers/diary.controller';
import { DiaryService } from './services/diary.service';
import { DiaryRepository } from './adapters/diary.repository';
import { DiaryEntity } from './adapters/diary.entity';
import { CustomerRepository } from '../customer/adapters/customer.repository';
import { CustomerEntity } from '../customer/adapters/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryEntity, CustomerEntity])],
  controllers: [DiaryController],
  providers: [DiaryService, DiaryRepository, CustomerRepository],
  exports: [DiaryService],
})
export class DiaryModule {}
