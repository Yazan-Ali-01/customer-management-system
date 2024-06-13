import { Request, Response } from 'express';
import { AuthService } from '../../../application/AuthService';
import { AppDataSource } from '../../database/ormconfig';
import { User } from '../../repositories/UserEntity';
import { UserRepository } from '../../repositories/UserRepository';
import { CreateUserDto } from '../../../domain/dtos/CreateUserDto';
import { validate } from 'class-validator';
import { RequestValidationError } from '../../../shared/errors/RequestValidationError';
import { AuthenticationError } from '../../../shared/errors/AuthenticationError';
import { JwtPayload } from 'jsonwebtoken';

const userRepository = new UserRepository(AppDataSource.getRepository(User));
const authService = new AuthService(userRepository);

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const createUserDto = new CreateUserDto();
    Object.assign(createUserDto, req.body);

    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      throw new RequestValidationError(errors);
    }

    const user = await authService.register(createUserDto);
    res.status(201).json({ message: 'User registered successfully', user });
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const { token, refreshToken } = await authService.login(email, password);
    res.cookie('token', token, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.json({ message: 'Logged in successfully', token, refreshToken });
  }

  async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new AuthenticationError('No refresh token provided');
    }

    try {
      const decoded = AuthService.verifyRefreshToken(refreshToken) as JwtPayload;
      const token = AuthService.generateToken({ id: decoded.id, email: decoded.email });
      res.cookie('token', token, { httpOnly: true });
      res.json({ message: 'Token refreshed successfully' });
    } catch (error) {
      throw new AuthenticationError('Invalid refresh token');
    }
  }

  async me(req: Request, res: Response): Promise<void> {
    res.json(req.user);
  }
}