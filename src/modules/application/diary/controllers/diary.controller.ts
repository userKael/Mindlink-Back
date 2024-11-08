import { Body, Controller, Get, Post } from '@nestjs/common';
import { DiaryEntity } from '../adapters/diary.entity';
import { DiaryService } from '../services/diary.service';

@Controller('diary')
export class DiaryController {
    constructor(private readonly diaryService: DiaryService) {}

  @Get()
  async listMarkToday(): Promise<any> {
    return this.diaryService.listDiaryToday();
  }

  @Post()
  async markDiary(@Body() diaryData): Promise<any> {
    return this.diaryService.createDiary(diaryData);
  }
  

  @Get('available')
  async diaryAvailable(): Promise<any>{
    return this.diaryService.listAvailable();
  }
}
