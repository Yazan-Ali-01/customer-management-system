import { Customer } from './Customer';

export interface ICustomerRepository {
  findAll(options?: { page?: number; limit?: number }): Promise<Customer[]>;
  findById(id: number): Promise<Customer | null>;
  save(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
  delete(id: number): Promise<void>;
}
