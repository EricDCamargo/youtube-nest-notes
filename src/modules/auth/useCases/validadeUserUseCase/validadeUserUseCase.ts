import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { AuthValuesIncorrectExceptions } from '../../exceptions/AuthValuesIncorrectExceptions';

interface ValidateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidadeUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({ email, password }: ValidateUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AuthValuesIncorrectExceptions();

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) throw new AuthValuesIncorrectExceptions();

    return user;
  }
}
