import { HttpException, HttpStatus } from '@nestjs/common';

export interface AppExceptionsProps {
  message: string;
  status: HttpStatus;
  fields?: {
    [key: string]: string;
  };
}

export class AppExceptions extends HttpException {
  constructor({ message, status, fields }: AppExceptionsProps) {
    super(
      {
        message,
        fields,
      },
      status,
    );
  }
}
