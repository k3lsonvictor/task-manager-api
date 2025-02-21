import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from "@nestjs/common";
import { SignInUseCase } from "src/modules/auth/use-cases/sign-in-use-case/sign-in-use-case";
import { Public } from "./decorators/is-public";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthRequestModel } from "./models/auth-request-model";

@Controller()
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) { }

  @Post("signIn")
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() request: AuthRequestModel) {
    const { access_token, userId } = await this.signInUseCase.execute({
      user: request.user,
    });

    // Retorna o token e o userId
    return { access_token, userId };
  }
}