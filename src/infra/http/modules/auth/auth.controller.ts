import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequestModel } from './models/authRequestModel';

@Controller()
export class AuthController {
  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  async signIn(@Request() request: AuthRequestModel) {
    return request.user;
  }
}
