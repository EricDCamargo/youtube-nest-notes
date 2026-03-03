import { ValidadeUserUseCase } from './validadeUserUseCase';
import { UserRepositoryInMemory } from 'src/modules/user/repositories/UserRepositoryInMemory';
import { hash } from 'bcrypt';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { UnauthorizedException } from '@nestjs/common';

let validadeUserUseCase: ValidadeUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Validade User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validadeUserUseCase = new ValidadeUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to return an user when credentials are correct', async () => {
    const userPasswordWithoutEncryption = '123456';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.create(user);

    const result = await validadeUserUseCase.execute({
      email: user.email,
      password: userPasswordWithoutEncryption,
    });

    expect(result).toEqual(user);
  });
  it('Should be able to throw an error when credentials are incorrect', async () => {
    const userPasswordWithoutEncryption = '123456';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.create(user);

    expect(async () => {
      await validadeUserUseCase.execute({
        email: 'incorrect@gmail.com',
        password: userPasswordWithoutEncryption,
      });
    }).rejects.toThrow(UnauthorizedException);

    expect(async () => {
      await validadeUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
