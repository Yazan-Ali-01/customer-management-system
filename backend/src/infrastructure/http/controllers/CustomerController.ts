import { Request, Response } from 'express';
import { CustomerService } from '../../../application/CustomerService';
import { CreateCustomerDto } from '../../../domain/dtos/CreateCustomerDto';
import { validate } from 'class-validator';
import { RequestValidationError } from '../../../shared/errors/RequestValidationError';
import { NotFoundError } from '../../../shared/errors/NotFoundError';
import { invalidateCache } from '../../../shared/utils/cacheMiddleware';

export class CustomerController {
  constructor(private customerService: CustomerService) { }

  async getAll(req: Request, res: Response): Promise<void> {
    const { page = 1, limit = 100 } = req.query;
    const customers = await this.customerService.getAllCustomers({ page: Number(page), limit: Number(limit) });
    res.json(customers);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const customer = await this.customerService.getCustomerById(parseInt(req.params.id, 10));
    if (!customer) {
      throw new NotFoundError('Customer not found');
    }
    res.json(customer);
  }

  async create(req: Request, res: Response): Promise<void> {
    const createCustomerDto = new CreateCustomerDto();
    Object.assign(createCustomerDto, req.body);

    const errors = await validate(createCustomerDto);
    if (errors.length > 0) {
      throw new RequestValidationError(errors);
    }

    const customer = await this.customerService.createCustomer(createCustomerDto);
    await invalidateCache('/customers');
    res.status(201).json(customer);
  }

  async update(req: Request, res: Response): Promise<void> {
    const updateCustomerDto = new CreateCustomerDto();
    Object.assign(updateCustomerDto, req.body);

    const errors = await validate(updateCustomerDto);
    if (errors.length > 0) {
      throw new RequestValidationError(errors);
    }

    const customer = await this.customerService.updateCustomer(parseInt(req.params.id, 10), updateCustomerDto);
    if (!customer) {
      throw new NotFoundError('Customer not found');
    }
    await invalidateCache(`/customers/${req.params.id}`); // Invalidate the cache for the specific customer endpoint
    await invalidateCache('/customers'); // Invalidate the cache for the list endpoint
    res.json(customer);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const customer = await this.customerService.getCustomerById(parseInt(req.params.id, 10));
    if (!customer) {
      throw new NotFoundError('Customer not found');
    }
    await this.customerService.deleteCustomer(parseInt(req.params.id, 10));
    await invalidateCache(`/customers/${req.params.id}`); // Invalidate the cache for the specific customer endpoint
    await invalidateCache('/customers'); // Invalidate the cache for the list endpoint

    res.status(204).send();
  }
}
