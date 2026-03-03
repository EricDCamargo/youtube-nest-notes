import { User as UserRaw } from 'generated/prisma/client';
import { User } from 'src/modules/user/entities/User';

export class PrismaUserMapper {
  static toPrisma({ id, name, email, password, createdAt }: User): UserRaw {
    return {
      id,
      name,
      email,
      password,
      createdAt,
    };
  }
}
