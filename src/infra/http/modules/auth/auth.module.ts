import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { ValidadeUserUseCase } from 'src/modules/auth/useCases/validadeUserUseCase/validadeUserUseCase';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { SignInDTOValidadeMiddleware } from './middleware/signInDTOValidade.middleware';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AuthController],
  providers: [LocalStrategy, ValidadeUserUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidadeMiddleware).forRoutes('/signIn');
  }
}
