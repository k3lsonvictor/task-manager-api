import { HttpStatus } from '@nestjs/common';
import { AppExceptions } from './app-exceptions';

export class InvalidAccessTokenException extends AppExceptions {
  constructor() {
    super({
      message: 'Access token inválido ou expirado',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
