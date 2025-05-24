import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ValidateUserUseCase } from "../use-cases/validate-user-use-case/validate-user-use-case";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validadeUserUseCase: ValidateUserUseCase) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log("entrou aqui", email, password);
    return await this.validadeUserUseCase.execute({
      email,
      password,
    });
  }
}
