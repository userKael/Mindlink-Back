import {  Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerRepository {
    constructor(
        @InjectRepository(CustomerEntity)
        private readonly repository: Repository<CustomerEntity>,
      ) {}

    async create (customerData){
        return await this.repository.save(customerData);
    }
}
