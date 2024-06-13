import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';
import { CustomerService } from '../../../application/CustomerService';
import { CustomerRepository } from '../../repositories/CustomerRepository';
import { authenticateJWT } from '../middleware/authMiddleware';
import { cacheMiddleware } from '../../../shared/utils/cacheMiddleware';
import { AppDataSource } from '../../database/ormconfig';
import { Customer } from '../../repositories/CustomerEntity';

const router = Router();

const customerRepository = new CustomerRepository(AppDataSource.getRepository(Customer));
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);

router.get('/', authenticateJWT, cacheMiddleware, customerController.getAll.bind(customerController));
router.get('/:id', authenticateJWT, cacheMiddleware, customerController.getById.bind(customerController));
router.post('/', authenticateJWT, customerController.create.bind(customerController));
router.put('/:id', authenticateJWT, customerController.update.bind(customerController));
router.delete('/:id', authenticateJWT, customerController.delete.bind(customerController));

export default router;
