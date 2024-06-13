import { Repository } from 'typeorm';
import { User } from './UserEntity';
import { IUserRepository } from '../../domain/IUserRepository';

export class UserRepository implements IUserRepository {
  constructor(private ormRepository: Repository<User>) { }

  findByEmail(email: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { email } });
  }

  save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
