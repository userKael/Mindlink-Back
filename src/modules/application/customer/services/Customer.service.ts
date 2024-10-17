import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from '../adapters/customer.repository';
import { CustomerEntity } from '../adapters/customer.entity';
import { CreateCustomerDto } from '../adapters/dtos/customer.dto';
import { PaginationSort } from 'src/modules/common/paginated';
import { IFilterCustomerInput } from '../controllers/entities/customer.interface';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async createCustomer(customerData: CreateCustomerDto): Promise<any> {
    await this.customerRepository.create(customerData);

    return 'Criado com sucesso';
  }

  async paginate(
    page: number,
    pageSize: number,
    sort: PaginationSort,
    filter: IFilterCustomerInput,
  ): Promise<{ items: any[]; total: number }> {
    return this.customerRepository.paginate({
      page,
      pageSize,
      sort,
      filter,
    });
  }
}
