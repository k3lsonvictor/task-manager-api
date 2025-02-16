import { HttpStatus } from "@nestjs/common";
import { AppExceptions } from "src/exceptions/app-exceptions";

export class AuthValuesIncorrectException extends AppExceptions {
  constructor() {
    super({
      message: "Email or password incorrects",
      status: HttpStatus.UNAUTHORIZED,
    })
  }
}