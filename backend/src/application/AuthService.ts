import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUserRepository } from '../domain/IUserRepository';
import { User } from '../domain/User';
import { CreateUserDto } from '../domain/dtos/CreateUserDto';
import { AuthenticationError } from '../shared/errors/AuthenticationError';

const jwtSecret = process.env.JWT_SECRET || 'development_secret';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';
const jwtExpiry = process.env.JWT_EXPIRY || '1h';
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || '7d';

export class AuthService {
  constructor(private userRepository: IUserRepository) { }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateToken(user: { id: number; email: string }): string {
    return jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: jwtExpiry });
  }

  static generateRefreshToken(user: { id: number; email: string }): string {
    return jwt.sign({ id: user.id, email: user.email }, refreshTokenSecret, { expiresIn: refreshTokenExpiry });
  }

  static verifyToken(token: string): string | JwtPayload {
    return jwt.verify(token, jwtSecret);
  }

  static verifyRefreshToken(token: string): string | JwtPayload {
    return jwt.verify(token, refreshTokenSecret);
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await AuthService.hashPassword(createUserDto.password);
    const user = new User();
    user.email = createUserDto.email;
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<{ token: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await AuthService.comparePassword(password, user.password))) {
      throw new AuthenticationError();
    }

    const token = AuthService.generateToken({ id: user.id, email: user.email });
    const refreshToken = AuthService.generateRefreshToken({ id: user.id, email: user.email });

    return { token, refreshToken };
  }
}