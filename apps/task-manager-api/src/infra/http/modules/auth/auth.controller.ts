import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from "@nestjs/common";
import { SignInUseCase } from "src/modules/auth/use-cases/sign-in-use-case/sign-in-use-case";
import { Public } from "./decorators/is-public";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthRequestModel } from "./models/auth-request-model";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SignInBody } from "./dtos/sign-in-body";
import { SignInResponseDto } from "./dtos/sign-in-response";

@Controller()
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) { }

  @Post("signIn")
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: "Verifica as credenciais do usuários e faz singIn na plataforma"})
  @ApiBody({
    description: "Dados realizar a autenticação do usuário",
    type: SignInBody
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Usuário autenticado com sucesso",
    type: SignInResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Email ou senha incorretos"})
  async signIn(@Request() request: AuthRequestModel) {
    const { access_token, userId } = await this.signInUseCase.execute({
      user: request.user,
    });

    // Retorna o token e o userId
    return { access_token, userId };
  }
}