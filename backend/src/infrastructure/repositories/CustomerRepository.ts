import { Repository } from 'typeorm';
import { Customer } from './CustomerEntity';
import { ICustomerRepository } from '../../domain/ICustomerRepository';

export class CustomerRepository implements ICustomerRepository {
  constructor(private ormRepository: Repository<Customer>) { }

  findAll({ page = 1, limit = 10 } = {}): Promise<Customer[]> {
    const skip = (page - 1) * limit;
    return this.ormRepository.find({
      skip,
      take: limit,
    });
  }

  findById(id: number): Promise<Customer | null> {
    return this.ormRepository.findOneBy({ id });
  }

  save(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer);
  }

  update(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer); // TypeORM save method also handles updates
  }

  delete(id: number): Promise<void> {
    return this.ormRepository.delete(id).then(() => { });
  }
}
