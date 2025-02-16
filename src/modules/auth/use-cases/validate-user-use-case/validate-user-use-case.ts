import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/user/repositories/user-repository";
import { compare } from "bcrypt"
import { AuthValuesIncorrectException } from "../../exceptions/auth-values-incorrect-exceptions";

interface ValidadeUserRequest {
  email: string;
  password: string;
}

@Injectable() //verifica se as credenciais do usuários estão corretas
export class ValidateUserUseCase {
  //para verificar as credenciais é necessário a conexão com o banco de dados
  //deve então chamar o userRepository
  constructor(private userRepository: UserRepository) { }
  async execute({ email, password }: ValidadeUserRequest) {
    console.log(email, password)
    const user = await this.userRepository.findByEmail(email);

    console.log(user)

    if (!user) throw new AuthValuesIncorrectException();

    const isPasswordCorrect = await compare(password, user.password);

    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) throw new AuthValuesIncorrectException();

    return user;

  }
}