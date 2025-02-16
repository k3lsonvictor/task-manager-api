import { HttpStatus } from '@nestjs/common';
import { AppExceptions, AppExceptionsProps } from './app-exceptions';

interface IncorrectValuesExceptionProps {
  fields: AppExceptionsProps['fields'];
}

export class IncorrectValuesException extends AppExceptions {
  constructor({ fields }: IncorrectValuesExceptionProps) {
    super({
      message: 'Dados inválidos',
      status: HttpStatus.BAD_REQUEST,
      fields,
    });
  }
}
