import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/modules/user/use-cases/create-user-use-case/create-user-use-case";
import { CreateUserBody } from "./dtos/create-user-body";
import { Public } from "../auth/decorators/is-public";
import { UserViewModel } from "./view-model/user-view-model";

@Controller("users")
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @Public()
  async createPost(@Body() body: CreateUserBody) {
    const { name, email, password } = body;

    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
    })

    return UserViewModel.toHttp(user);
  }
}