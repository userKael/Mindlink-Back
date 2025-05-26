import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PaymentService } from '../services/payment.service';
import { InvoiceService } from '../services/invoice.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly invoiceService: InvoiceService,
  ) {}

  @Post()
  async createPayment(@Body() paymentData): Promise<any> {
    return this.paymentService.createPayment(paymentData);
  }

  @Get()
  async listPayments(): Promise<any> {
    return this.paymentService.getAllPayments();
  }

  @Get('paid')
  async listPaidPayments(): Promise<any> {
    return this.paymentService.getPaidPayments();
  }

  @Get(':id/invoice')
  async downloadInvoice(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const pdfBuffer = await this.invoiceService.generateInvoice(id);
      res
        .set({
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename=invoice_${id}.pdf`,
        })
        .send(pdfBuffer);
    } catch (err) {
      if (err instanceof NotFoundException) {
        res.status(404).json({ message: err.message });
        return;
      }
      throw err;
    }
  }
}
