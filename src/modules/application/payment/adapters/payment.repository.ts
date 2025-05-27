import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repository: Repository<PaymentEntity>,
  ) {}

  async create(paymentData: Partial<PaymentEntity>): Promise<PaymentEntity> {
    return this.repository.save(paymentData);
  }

  async findAllWithCustomer(): Promise<PaymentEntity[]> {
    return this.repository.find({
      relations: ['customer'],
      where: { status: 'Pendente' },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findPaid(): Promise<PaymentEntity[]> {
    return this.repository.find({
      where: { status: 'Pago' },
      relations: ['customer'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByIdWithCustomer(id: number): Promise<PaymentEntity> {
    return this.repository.findOne({
      where: { id },
      relations: ['customer'],
    });
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
