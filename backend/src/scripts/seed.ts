import 'reflect-metadata';
import { AppDataSource } from '../infrastructure/database/ormconfig';
import { Customer } from '../infrastructure/repositories/CustomerEntity';
import Chance from 'chance';

const chance = new Chance();

const seedData = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Inserting new customers into the database...');

    const customers = [];
    for (let i = 0; i < 25; i++) {
      const customer = new Customer();
      customer.name = chance.name();
      customer.email = chance.email();
      customer.address = chance.address();
      customers.push(customer);
    }

    await AppDataSource.manager.save(customers);
    console.log('Customers have been saved.');

    console.log('Loading customers from the database...');
    const loadedCustomers = await AppDataSource.manager.find(Customer);
    console.log('Loaded customers: ', loadedCustomers);

  } catch (error) {
    console.error(error);
  } finally {
    await AppDataSource.destroy();
  }
};

seedData();
