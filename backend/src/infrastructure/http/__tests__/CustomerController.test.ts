// src/infrastructure/http/__tests__/CustomerController.test.ts
import { CustomerController } from '../controllers/CustomerController';
import { CustomerService } from '../../../application/CustomerService';
import { CustomerRepository } from '../../repositories/CustomerRepository';
import { Customer } from '../../repositories/CustomerEntity';
import { AppDataSource } from '../../database/ormconfig';
import { Request, Response } from 'express';
import { CreateCustomerDto } from '../../../domain/dtos/CreateCustomerDto';
import { NotFoundError } from '../../../shared/errors/NotFoundError';
import { RequestValidationError } from '../../../shared/errors/RequestValidationError';

jest.mock('../../../application/CustomerService');
jest.mock('../../repositories/CustomerRepository');
jest.mock('../../database/ormconfig');

describe('CustomerController', () => {
  let customerController: CustomerController;
  let customerService: jest.Mocked<CustomerService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    const customerRepository = new CustomerRepository(AppDataSource.getRepository(Customer));
    customerService = new CustomerService(customerRepository) as jest.Mocked<CustomerService>;
    customerController = new CustomerController(customerService);

    req = {
      body: {},
      params: {},
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    // Mock the customerService methods
    customerService.getAllCustomers = jest.fn();
    customerService.getCustomerById = jest.fn();
    customerService.createCustomer = jest.fn();
    customerService.updateCustomer = jest.fn();
    customerService.deleteCustomer = jest.fn();
  });

  it('should get all customers', async () => {
    const customers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', address: '123 Main St' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', address: '456 Elm St' },
    ] as Customer[];

    customerService.getAllCustomers.mockResolvedValue(customers);

    await customerController.getAll(req as Request, res as Response);
    expect(customerService.getAllCustomers).toHaveBeenCalledWith({ page: 1, limit: 10 });
    expect(res.json).toHaveBeenCalledWith(customers);
  });

  it('should get a customer by id', async () => {
    const customer = { id: 1, name: 'John Doe', email: 'john@example.com', address: '123 Main St' } as Customer;

    req.params!.id = '1';
    customerService.getCustomerById.mockResolvedValue(customer);

    await customerController.getById(req as Request, res as Response);
    expect(customerService.getCustomerById).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(customer);
  });

  it('should create a customer', async () => {
    const createCustomerDto = new CreateCustomerDto();
    createCustomerDto.name = 'John Doe';
    createCustomerDto.email = 'john@example.com';
    createCustomerDto.address = '123 Main St';

    req.body = createCustomerDto;
    const customer = { id: 1, ...createCustomerDto } as Customer;

    customerService.createCustomer.mockResolvedValue(customer);

    await customerController.create(req as Request, res as Response);
    expect(customerService.createCustomer).toHaveBeenCalledWith(createCustomerDto);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(customer);
  });

  it('should update a customer', async () => {
    const updateCustomerDto = new CreateCustomerDto();
    updateCustomerDto.name = 'John Doe';
    updateCustomerDto.email = 'john@example.com';
    updateCustomerDto.address = '123 Main St';

    req.body = updateCustomerDto;
    req.params!.id = '1';
    const updatedCustomer = { id: 1, ...updateCustomerDto } as Customer;

    customerService.updateCustomer.mockResolvedValue(updatedCustomer);

    await customerController.update(req as Request, res as Response);
    expect(customerService.updateCustomer).toHaveBeenCalledWith(1, updateCustomerDto);
    expect(res.json).toHaveBeenCalledWith(updatedCustomer);
  });

  it('should delete a customer', async () => {
    req.params!.id = '1';
    customerService.getCustomerById.mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com', address: '123 Main St' } as Customer);
    customerService.deleteCustomer.mockResolvedValue();

    await customerController.delete(req as Request, res as Response);
    expect(customerService.deleteCustomer).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('should return 404 when customer not found for deletion', async () => {
    req.params!.id = '1';
    customerService.getCustomerById.mockResolvedValue(null);

    await expect(customerController.delete(req as Request, res as Response)).rejects.toThrow(NotFoundError);
    expect(customerService.getCustomerById).toHaveBeenCalledWith(1);
  });

  it('should return 404 when customer not found', async () => {
    req.params!.id = '1';
    customerService.getCustomerById.mockResolvedValue(null);

    await expect(customerController.getById(req as Request, res as Response)).rejects.toThrow(NotFoundError);
    expect(customerService.getCustomerById).toHaveBeenCalledWith(1);
  });

  it('should return 400 when request validation fails', async () => {
    req.body = {};

    const validationErrors = [
      {
        property: 'name',
        constraints: {
          isNotEmpty: 'name should not be empty',
        },
      },
    ];

    jest.spyOn(customerService, 'createCustomer').mockImplementation(() => {
      throw new RequestValidationError(validationErrors);
    });

    await expect(customerController.create(req as Request, res as Response)).rejects.toThrow(RequestValidationError);
  });
});
