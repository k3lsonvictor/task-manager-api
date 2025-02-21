import { HttpStatus } from "@nestjs/common";
import { AppExceptions } from "src/exceptions/app-exceptions";

export class JwtNotDefinedException extends AppExceptions {
  constructor() {
    super({
      message: "Internal Server Error",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });

    console.error("Erro crítico: JWT_SECRET is not defined in environment variables");
  }
}
