// src\application\__tests__\AuthService.test.ts
import { AuthService } from '../AuthService';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { User } from '../../domain/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../domain/dtos/CreateUserDto';
import { AuthenticationError } from '../../shared/errors/AuthenticationError';

jest.mock('../../infrastructure/repositories/UserRepository');

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: jest.Mocked<UserRepository>;
  let ormRepository: jest.Mocked<Repository<User>>;

  beforeEach(() => {
    ormRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as any;

    userRepository = new UserRepository(ormRepository) as jest.Mocked<UserRepository>;
    authService = new AuthService(userRepository);
  });

  it('should register a new user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const newUser = new User();
    newUser.id = 1;
    newUser.email = createUserDto.email;
    newUser.password = await AuthService.hashPassword(createUserDto.password);

    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.save.mockResolvedValue(newUser);

    const result = await authService.register(createUserDto);
    expect(result).toEqual(newUser);
    expect(userRepository.findByEmail).toHaveBeenCalledWith(createUserDto.email);
    expect(userRepository.save).toHaveBeenCalledWith(expect.objectContaining({ email: createUserDto.email }));
  });

  it('should not register an existing user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const existingUser = new User();
    existingUser.id = 1;
    existingUser.email = createUserDto.email;
    existingUser.password = 'hashed_password';

    userRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(authService.register(createUserDto)).rejects.toThrow('User already exists');
    expect(userRepository.findByEmail).toHaveBeenCalledWith(createUserDto.email);
    expect(userRepository.save).not.toHaveBeenCalled();
  });

  it('should login a user', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const user = new User();
    user.id = 1;
    user.email = email;
    user.password = await AuthService.hashPassword(password);

    userRepository.findByEmail.mockResolvedValue(user);

    const token = await authService.login(email, password);
    expect(token).toBeDefined();
  });

  it('should not login with invalid credentials', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    userRepository.findByEmail.mockResolvedValue(null);

    await expect(authService.login(email, password)).rejects.toThrow(AuthenticationError);
  });
});

