import {
  IsString,
  IsEmail,
  IsOptional,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'O CPF não pode estar vazio' })
  @Matches(/^\d{11}$/, { message: 'O CPF precisa ter 11 dígitos' })
  cpf: string;

  @IsString()
  @IsNotEmpty({ message: 'O número de celular não pode estar vazio' })
  @Matches(/^\d{11}$/, {
    message: 'O número de celular precisa ter 11 dígitos',
  })
  phone: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  email: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'O email do cliente não pode estar vazio' })
  client_email: string;

  @IsOptional()
  @IsString()
  additional_infos?: string;
}
