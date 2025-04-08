import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { SignInBody } from "../dtos/sign-in-body";
import { validate } from "class-validator";
import { mapperClassValidationErrorToAppException } from "src/utils/mappers";
import { IncorrectValuesException } from "src/exceptions/incorretct-value-exception";

@Injectable()
export class SignInDTOValidateMiddleware implements NestMiddleware {
  async use(req: Request, next: NextFunction) {
    const { email, password } = req.body as { email: string; password: string };

    const signInBody = new SignInBody();
    signInBody.email = email;
    signInBody.password = password;

    const validations = await validate(signInBody);

    if (validations.length) {
      throw new IncorrectValuesException({
        fields: mapperClassValidationErrorToAppException(validations),
      });
    }

    next();
  }
}
