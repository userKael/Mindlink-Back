import { Brackets, Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationSort } from 'src/modules/common/paginated';
import { IFilterCustomerInput } from '../controllers/entities/customer.interface';
import { CreateCustomerDto } from './dtos/customer.dto';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
  ) {}

  async create(customerData: any) {
    return this.repository.save(customerData);
  }

  async paginate({
    sort,
    page,
    pageSize,
    filter,
  }: {
    sort: PaginationSort;
    page: number;
    pageSize: number;
    filter?: IFilterCustomerInput;
  }): Promise<any> {
    const queryBuilder = this.repository.createQueryBuilder('customer');

    if (filter) {
      if (filter.name) {
        queryBuilder.andWhere('customer.name LIKE :name', {
          name: `%${filter.name}%`,
        });
      }
      if (filter.cpf) {
        queryBuilder.andWhere('customer.cpf = :cpf', { cpf: filter.cpf });
      }
      if (filter.phone) {
        queryBuilder.andWhere('customer.phone = :phone', {
          phone: filter.phone,
        });
      }
      if (filter.email) {
        queryBuilder.andWhere('customer.email LIKE :email', {
          email: `%${filter.email}%`,
        });
      }
      if (filter.client_email) {
        queryBuilder.andWhere('customer.client_email = :client_email', {
          client_email: filter.client_email,
        });
      }
      if (filter.id) {
        queryBuilder.andWhere('customer.id = :id', {
          id: filter.id,
        });
      }
      if (filter.searchBy) {
        queryBuilder.andWhere(
          new Brackets((qb) => {
            qb.orWhere('customer.name LIKE :name', {
              name: `%${filter.searchBy}%`,
            })
              .orWhere('customer.cpf = :cpf', { cpf: filter.searchBy })
              .orWhere('customer.phone = :phone', {
                phone: filter.searchBy,
              })
              .orWhere('customer.email LIKE :email', {
                email: `%${filter.searchBy}%`,
              })
              .orWhere('customer.cpf = :cpf', { cpf: filter.searchBy });
          }),
        );
      }
    }

    queryBuilder.skip((page - 1) * pageSize).take(pageSize);

    queryBuilder.orderBy('customer.createdAt', sort);

    const [items, total] = await queryBuilder.getManyAndCount();
    return {
      items,
      total,
    };
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }

  async update(id: number, updateData: Partial<CreateCustomerDto>) {
    return this.repository.update(id, updateData);
  }

  async findOne(id: number): Promise<CustomerEntity | undefined> {
    return this.repository.findOne({ where: { id } });
  }
}
