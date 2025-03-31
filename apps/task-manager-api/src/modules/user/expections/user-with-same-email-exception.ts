import { HttpStatus } from '@nestjs/common';
import { AppExceptions } from '../../../exceptions/app-exceptions';

export class UserWithSameEmailExpection extends AppExceptions {
  constructor() {
    super({
      message: 'Email already registered',
      status: HttpStatus.CONFLICT,
    });
  }
}
