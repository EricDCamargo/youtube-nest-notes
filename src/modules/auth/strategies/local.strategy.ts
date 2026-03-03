import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ValidadeUserUseCase } from '../useCases/validadeUserUseCase/validadeUserUseCase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validadeUserUseCase: ValidadeUserUseCase) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('validate');
    return await this.validadeUserUseCase.execute({
      email,
      password,
    });
  }
}
