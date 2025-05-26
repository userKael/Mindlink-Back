import { Injectable, NotFoundException } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';
import { PaymentRepository } from '../adapters/payment.repository';
import axios from 'axios';

@Injectable()
export class InvoiceService {
  constructor(private readonly paymentRepo: PaymentRepository) {}

  async generateInvoice(paymentId: number): Promise<Buffer> {
    const payment = await this.paymentRepo.findByIdWithCustomer(paymentId);
    if (!payment) throw new NotFoundException('Pagamento não encontrado');

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    const endPromise = new Promise<Buffer>((resolve) =>
      doc.on('end', () => resolve(Buffer.concat(chunks))),
    );

    try {
      const logoUrl = 'https://i.postimg.cc/D0jZ5nQf/MINDLINK-1.png';
      const response = await axios.get(logoUrl, {
        responseType: 'arraybuffer',
      });
      const logoBuffer = Buffer.from(response.data, 'binary');
      doc.image(logoBuffer, 50, 30, { width: 200 });
    } catch (err) {
      console.warn('Erro ao carregar imagem de cabeçalho:', err.message);
    }

    doc.moveDown(6);

    doc
      .fontSize(20)
      .text('Fatura de Consulta Psicológica', { align: 'center' })
      .moveDown();

    doc
      .fontSize(12)
      .text(`Psicólogo: ${payment.psychoEmail}`)
      .text(`Cliente: ${payment.customer.name} <${payment.customer.email}>`)
      .moveDown();

    const formatDate = (date: Date) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };
    doc
      .text(`ID da Fatura: ${payment.id}`)
      .text(`Valor: R$ ${(payment.amount / 100).toFixed(2)}`)
      .text(`Status: ${payment.status}`)
      .text(`Data de Emissão: ${formatDate(payment.createdAt)}`)
      .text(`Data de Expiração: ${formatDate(payment.expires_at)}`)
      .moveDown();

    doc
      .fillColor('blue')
      .text('Link do pagamento:', { continued: true })
      .fillColor('black')
      .text(` ${payment.payment_link}`)
      .moveDown(2);

    doc
      .fontSize(10)
      .fillColor('gray')
      .text('Obrigado por usar nosso sistema de agendamento.', {
        align: 'center',
      });

    doc.end();
    return endPromise;
  }
}
