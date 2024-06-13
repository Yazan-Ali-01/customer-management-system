import { ICustomerRepository } from '../domain/ICustomerRepository';
import { Customer } from '../domain/Customer';

export class CustomerService {
  constructor(private customerRepository: ICustomerRepository) { }

  async getAllCustomers(options?: { page?: number; limit?: number }): Promise<Customer[]> {
    return this.customerRepository.findAll(options);
  }

  async getCustomerById(id: number): Promise<Customer | null> {
    return this.customerRepository.findById(id);
  }

  async createCustomer(data: Omit<Customer, 'id'>): Promise<Customer> {
    const customer = new Customer(0, data.name, data.email, data.address);
    return this.customerRepository.save(customer);
  }

  async updateCustomer(id: number, data: Omit<Customer, 'id'>): Promise<Customer> {
    const customer = new Customer(id, data.name, data.email, data.address);
    return this.customerRepository.update(customer);
  }

  async deleteCustomer(id: number): Promise<void> {
    return this.customerRepository.delete(id);
  }
}
