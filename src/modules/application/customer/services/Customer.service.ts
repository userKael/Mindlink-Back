import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../adapters/customer.repository';
import { CreateCustomerDto } from '../adapters/dtos/customer.dto';
import { PaginationSort } from 'src/modules/common/paginated';
import { IFilterCustomerInput } from '../controllers/entities/customer.interface';
import BusinessException from 'src/exceptions/business.exception';

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

  async deleteCustomer(id: number): Promise<string> {
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0) {
      throw new BusinessException('Cliente não encontrado');
    }
    return 'Cliente excluído com sucesso';
  }

  async updateCustomer(
    id: number,
    updateData: Partial<CreateCustomerDto>,
  ): Promise<string> {
    const result = await this.customerRepository.update(id, updateData);
    if (result.affected === 0) {
      throw new BusinessException('Cliente não encontrado');
    }
    return 'Cliente atualizado com sucesso';
  }
}
