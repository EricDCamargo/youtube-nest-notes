import { User } from 'src/modules/user/entities/User';

export class UserViewModel {
  static toHTTP({ id, name, email, createdAt }: User) {
    return {
      id,
      name,
      email,
      createdAt,
    };
  }
}
