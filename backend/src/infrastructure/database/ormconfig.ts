import { DataSource } from 'typeorm';
import { Customer } from '../repositories/CustomerEntity';
import { User } from '../repositories/UserEntity';
import dotenv from 'dotenv';

dotenv.config();

console.log('process.env.POSTGRES_USER', process.env.POSTGRES_USER);
console.log('process.env.POSTGRES_PASSWORD', process.env.POSTGRES_PASSWORD);
console.log('process.env.POSTGRES_DB', process.env.POSTGRES_DB);

export const AppDataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Customer, User],
  migrations: ['src/migration/**/*.ts'],
  synchronize: true,
  logging: false,
  extra: {
    max: 20, // Maximum number of connections in the pool
    min: 2,  // Minimum number of connections in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  }
});
