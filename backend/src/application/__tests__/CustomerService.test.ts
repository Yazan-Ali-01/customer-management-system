import { CustomerService } from '../CustomerService';
import { CustomerRepository } from '../../infrastructure/repositories/CustomerRepository';
import { Customer } from '../../domain/Customer';
import { Repository } from 'typeorm';

jest.mock('../../infrastructure/repositories/CustomerRepository');

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customerRepository: jest.Mocked<CustomerRepository>;
  let ormRepository: jest.Mocked<Repository<Customer>>;

  beforeEach(() => {
    ormRepository = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as any;

    customerRepository = new CustomerRepository(ormRepository) as jest.Mocked<CustomerRepository>;
    customerService = new CustomerService(customerRepository);
  });

  it('should create a customer', async () => {
    const customerData = { name: 'John Doe', email: 'john@example.com', address: '123 Main St' };
    const createdCustomer = new Customer(1, customerData.name, customerData.email, customerData.address);

    customerRepository.save.mockResolvedValue(createdCustomer);  // Update mock method
    const customer = await customerService.createCustomer(customerData);
    console.log('customer', customer);

    expect(customer).toEqual(createdCustomer);
    expect(customerRepository.save).toHaveBeenCalledWith(expect.objectContaining(customerData));
  });

  it('should get all customers', async () => {
    const customers = [
      new Customer(1, 'John Doe', 'john@example.com', '123 Main St'),
      new Customer(2, 'Jane Doe', 'jane@example.com', '456 Elm St'),
    ];

    customerRepository.findAll.mockResolvedValue(customers);  // Update mock method
    const result = await customerService.getAllCustomers();
    console.log('result', result);

    expect(result).toEqual(customers);
    expect(customerRepository.findAll).toHaveBeenCalled();
  });

  it('should get customer by id', async () => {
    const customer = new Customer(1, 'John Doe', 'john@example.com', '123 Main St');

    customerRepository.findById.mockResolvedValue(customer);  // Update mock method
    const result = await customerService.getCustomerById(1);

    expect(result).toEqual(customer);
    expect(customerRepository.findById).toHaveBeenCalledWith(1);
  });

  it('should update a customer', async () => {
    const customerData = { id: 1, name: 'John Doe', email: 'john@example.com', address: '123 Main St' };
    const updatedCustomer = new Customer(customerData.id, customerData.name, customerData.email, customerData.address);

    customerRepository.update.mockResolvedValue(updatedCustomer);  // Update mock method
    const result = await customerService.updateCustomer(customerData.id, customerData);

    expect(result).toEqual(updatedCustomer);
    expect(customerRepository.update).toHaveBeenCalledWith(expect.objectContaining(customerData));
  });

  it('should delete a customer', async () => {
    customerRepository.delete.mockResolvedValue();  // Update mock method
    await customerService.deleteCustomer(1);

    expect(customerRepository.delete).toHaveBeenCalledWith(1);
  });
});
