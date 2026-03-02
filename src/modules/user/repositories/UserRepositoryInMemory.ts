import { User } from '../entities/user';
import { UserRepository } from './UserRepository';

export class UserRepositoryInMemory implements UserRepository {
  public users: User[] = [];

  create(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }
}
