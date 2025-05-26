import { Injectable } from '@nestjs/common';
import { DiaryRepository } from '../adapters/diary.repository';
import { CustomerRepository } from '../../customer/adapters/customer.repository';
import BusinessException from 'src/exceptions/business.exception';
import { format, addMinutes } from 'date-fns';

@Injectable()
export class DiaryService {
  constructor(
    private readonly diaryRepository: DiaryRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async createDiary(diaryData: any): Promise<any> {
    const customer = await this.customerRepository.findOne(
      diaryData.customerid,
    );
    if (!customer) {
      throw new BusinessException('Selecione um paciente');
    }

    const linkMeet = `https://meet.jit.si/${customer.email + diaryData.customerid}`;

    const newDiaryData = { ...diaryData, link: linkMeet, customer };

    await this.diaryRepository.create(newDiaryData);
    return 'Agendado com sucesso';
  }

  async listAvailable(): Promise<any> {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() - 3);

    const startOfDay = new Date(currentTime);
    startOfDay.setHours(8, 0, 0, 0);

    const endOfDay = new Date(currentTime);
    endOfDay.setHours(23, 30, 0, 0);

    let availableSlots = [];
    for (
      let current = startOfDay;
      current <= endOfDay;
      current = addMinutes(current, 30)
    ) {
      availableSlots.push(format(current, 'dd-MM-yyyy HH:mm'));
    }

    const currentTimeString = format(currentTime, 'dd-MM-yyyy HH:mm');
    availableSlots = availableSlots.filter((slot) => slot > currentTimeString);

    const scheduledAppointments =
      await this.diaryRepository.findDiaryAvailable();

    const bookedSlots = scheduledAppointments.map(
      (appointment) => appointment.date,
    );

    const freeSlots = availableSlots.filter(
      (slot) => !bookedSlots.includes(slot),
    );

    const result = freeSlots.map((slot) => ({
      customerName: '',
      psychoEmail: '',
      date: slot,
      status: 'Livre',
      link: '',
    }));

    return result;
  }

  async listDiaryToday(): Promise<any> {
    const markToday = await this.diaryRepository.findDiaryMarkWithCustomer();
    const formattedResult = markToday.map((diary) => ({
      customerName: diary.customer.name,
      psychoEmail: diary.psychoEmail,
      email: diary.customer.email,
      date: diary.date,
      status: diary.status,
      link: diary.link,
    }));

    return formattedResult;
  }
}
