import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from '../adapters/customer.repository';
import { CustomerEntity } from '../adapters/customer.entity';
import { CreateCustomerDto } from '../adapters/dtos/customer.dto';



@Injectable()
export class CustomerService {
  constructor(
    private customerRepository: CustomerRepository,
  ) {}

  async createCustomer(customerData: CreateCustomerDto): Promise<any> {
    
    await this.customerRepository.create(customerData);

    return 'Criado com sucesso'
  }
}
