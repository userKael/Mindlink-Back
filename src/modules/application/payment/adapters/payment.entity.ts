import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CustomerEntity } from '../../customer/adapters/customer.entity';

@Entity('payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  psychoEmail: string;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customerid' })
  customer: CustomerEntity;

  @Column()
  amount: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'paid' | 'cancelled';

  @Column()
  payment_link: string;

  @Column({ nullable: true })
  expires_at: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
