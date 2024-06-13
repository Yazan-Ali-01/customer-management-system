import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../../../application/AuthService';
import { UserRepository } from '../../repositories/UserRepository';
import { User } from '../../repositories/UserEntity';
import { AppDataSource } from '../../database/ormconfig';
import { Request, Response } from 'express';

jest.mock('../../../application/AuthService');
jest.mock('../../repositories/UserRepository');
jest.mock('../../database/ormconfig');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: jest.Mocked<AuthService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    const userRepository = new UserRepository(AppDataSource.getRepository(User));
    authService = new AuthService(userRepository) as jest.Mocked<AuthService>;
    authController = new AuthController();

    req = {
      body: {},
      cookies: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
      clearCookie: jest.fn(),
    };

    // Mock the authService methods
    authService.register = jest.fn();
    authService.login = jest.fn();
  });


  it('should logout a user', async () => {
    await authController.logout(req as Request, res as Response);

    expect(res.clearCookie).toHaveBeenCalledWith('token');
    expect(res.json).toHaveBeenCalledWith({ message: 'Logged out successfully' });
  });

  it('should get the current user', async () => {
    req.user = { id: 1, email: 'test@example.com' };

    await authController.me(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(req.user);
  });
});
