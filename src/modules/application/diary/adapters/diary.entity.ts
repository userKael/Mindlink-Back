import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { CustomerEntity } from '../../customer/adapters/customer.entity';

  @Entity('diary')
  export class DiaryEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    psychoEmail: string;
  
    @Column()
    date: string;
  
    @Column()
    status: 'Marcado' | 'Livre' | 'Confirmado';
  
    @Column()
    link: string;
  
    @ManyToOne(() => CustomerEntity)
    @JoinColumn({ name: 'customerid' })
    customer: CustomerEntity;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  