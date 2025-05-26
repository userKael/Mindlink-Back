import { Like, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiaryEntity } from './diary.entity';
import { format } from 'date-fns/format';

@Injectable()
export class DiaryRepository {
  constructor(
    @InjectRepository(DiaryEntity)
    private readonly repository: Repository<DiaryEntity>,
  ) {}

  async create(diaryData: any) {
    return this.repository.save(diaryData);
  }

  async findDiaryAvailable() {
    const today = new Date();
    const formattedToday = format(today, 'dd-MM-yyyy');

    return this.repository.find({
      where: {
        date: Like(`${formattedToday}%`),
        status: 'Marcado',
      },
    });
  }

  async findDiaryMarkWithCustomer() {
    const today = new Date();
    const formattedToday = format(today, 'dd-MM-yyyy');

    return this.repository.find({
      where: {
        date: Like(`${formattedToday}%`),
        status: 'Marcado',
      },
      relations: ['customer'],
    });
  }
}
