import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInBody {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsEmail()
  @MinLength(6)
  password: string;
}
