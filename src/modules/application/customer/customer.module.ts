import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './adapters/customer.entity';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/Customer.service';
import { CustomerRepository } from './adapters/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [CustomerService],
})
export class CustomerModule {}
