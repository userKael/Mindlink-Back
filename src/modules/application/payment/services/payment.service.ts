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
    const customer = await this.customerRepository.findOne(dto.customerid);
    if (!customer) {
      throw new BusinessException('Selecione um paciente');
    }
    const fakePaymentLink = this.generateFakeLink();

    const newPayment = {
      ...dto,
      status: 'Pendente',
      payment_link: fakePaymentLink,
      expires_at: this.generateExpirationDate(),
      customer,
    };

    const payment = await this.paymentRepository.create(newPayment);

    return payment;
  }

  async getAllPayments(): Promise<any> {
    const getPayment = await this.paymentRepository.findAllWithCustomer();

    const formatDate = (date: Date) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const transformedPayments = getPayment.map((payment) => ({
      id: payment.id,
      name: payment.customer.name,
      email: payment.customer.email,
      amount: payment.amount,
      status: payment.status,
      psychoEmail: payment.psychoEmail,
      payment_link: payment.payment_link,
      expires_at: formatDate(payment.expires_at),
    }));
    return transformedPayments;
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

  async getPaidPayments(): Promise<any> {
    const getPayment = await this.paymentRepository.findPaid();
    const formatDate = (date: Date) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const transformedPayments = getPayment.map((payment) => ({
      id: payment.id,
      name: payment.customer.name,
      email: payment.customer.email,
      amount: payment.amount,
      status: payment.status,
      psychoEmail: payment.psychoEmail,
      payment_link: payment.payment_link,
      expires_at: formatDate(payment.expires_at),
    }));

    return transformedPayments;
    
  }

  async deletePayment(id: number): Promise<string> {
    const result = await this.paymentRepository.delete(id);
    if (result.affected === 0) {
      throw new BusinessException('Fatura não encontrada');
    }
    return 'Fatura excluído com sucesso';
  }
}
