import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { ValidadeUserUseCase } from 'src/modules/auth/useCases/validadeUserUseCase/validadeUserUseCase';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { SignInDTOValidadeMiddleware } from './middleware/signInDTOValidade.middleware';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/signInUseCase';
import { JwtModule } from '@nestjs/jwt';
import { StringValue } from 'ms';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import 'dotenv/config';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE as StringValue },
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, ValidadeUserUseCase, SignInUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidadeMiddleware).forRoutes('/signIn');
  }
}
