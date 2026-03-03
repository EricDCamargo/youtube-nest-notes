import { User } from '../entities/User';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      email: 'email@gmail.com',
      name: 'Eric',
      password: '123456',
      ...override,
    },
    id,
  );
};
