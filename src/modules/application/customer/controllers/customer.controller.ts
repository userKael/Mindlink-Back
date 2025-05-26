import {
  Controller,
  Post,
  Body,
  Query,
  Delete,
  Param,
  Put,
} from '@nestjs/common';

import { CustomerService } from '../services/Customer.service';
import { CreateCustomerDto } from '../adapters/dtos/customer.dto';
import { IFilterCustomerInput } from './entities/customer.interface';
import Paginated, { PaginationSort } from 'src/modules/common/paginated';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() customerData: CreateCustomerDto): Promise<any> {
    return this.customerService.createCustomer(customerData);
    [];
  }

  @Post('paginate/list')
  async list(
    @Query('offset') page: number,
    @Query('limit') pageSize: number,
    @Query('sort') sort: PaginationSort,
    @Body() body: IFilterCustomerInput,
  ): Promise<any[]> {
    const { items, total } = await this.customerService.paginate(
      page,
      pageSize,
      sort,
      body,
    );
    const response = new Paginated<any>(items, page, pageSize, total, sort);
    return response.items;
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: number): Promise<string> {
    return this.customerService.deleteCustomer(id);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') id: number,
    @Body() updateData: Partial<CreateCustomerDto>,
  ): Promise<string> {
    return this.customerService.updateCustomer(id, updateData);
  }
}
