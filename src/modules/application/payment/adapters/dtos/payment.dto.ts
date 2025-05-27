import { IsNotEmpty} from 'class-validator';

export class CreatePaymentDto {
  psychoEmail: string;

  customerid: number;

  @IsNotEmpty({ message: 'Necessário adicionar um valor' })
  amount: number;
}
