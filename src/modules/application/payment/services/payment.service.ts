import { Injectable } from '@nestjs/common';
import { PaymentEntity } from '../adapters/payment.entity';
import { PaymentRepository } from '../adapters/payment.repository';
import BusinessException from 'src/exceptions/business.exception';
import { CustomerRepository } from '../../customer/adapters/customer.repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async createPayment(dto: any): Promise<PaymentEntity> {
    const customer = await this.customerRepository.findOne(dto.customer_id);
    if (!customer) {
      throw new BusinessException('Selecione um paciente');
    }
    const fakePaymentLink = this.generateFakeLink();

    const newPayment = {
      ...dto,
      status: 'pending',
      payment_link: fakePaymentLink,
      expires_at: this.generateExpirationDate(),
      customer,
    };

    const payment = await this.paymentRepository.create(newPayment);

    return payment;
  }

  async getAllPayments(): Promise<PaymentEntity[]> {
    return this.paymentRepository.findAllWithCustomer();
  }

  private generateFakeLink(): string {
    const id = Math.random().toString(36).substring(2, 10);
    return `https://pagamento-fake.com/pagar/${id}`;
  }

  private generateExpirationDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  }

  async getPaidPayments(): Promise<PaymentEntity[]> {
    return this.paymentRepository.findPaid();
  }
}
