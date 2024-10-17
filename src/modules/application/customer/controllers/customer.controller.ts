import { Controller, Post, Body } from '@nestjs/common';

import { CustomerService } from '../services/Customer.service';
import { CreateCustomerDto } from '../adapters/dtos/customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() customerData: CreateCustomerDto): Promise<any> {
    return await this.customerService.createCustomer(customerData);[]
  }
}
