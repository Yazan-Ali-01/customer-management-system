import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
@Index('IDX_custom_customer_email', ['email'])
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text', { nullable: true })
  name!: string;

  @Column('text', { nullable: true })
  @Index()
  email!: string;

  @Column('text', { nullable: true })
  address!: string;
}
