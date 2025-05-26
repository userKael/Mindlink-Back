import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentRepository } from './adapters/payment.repository';
import { PaymentEntity } from './adapters/payment.entity';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { CustomerRepository } from '../customer/adapters/customer.repository';
import { CustomerEntity } from '../customer/adapters/customer.entity';
import { InvoiceService } from './services/invoice.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity, CustomerEntity])],
  controllers: [PaymentController],
  providers: [
    PaymentRepository,
    PaymentService,
    CustomerRepository,
    InvoiceService,
  ],
  exports: [PaymentRepository],
})
export class PaymentModule {}
