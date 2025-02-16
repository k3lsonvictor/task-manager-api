import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repositories/user-repository";
import { hash } from "bcrypt"
import { User } from "../../entities/user";
import { UserWithSameEmailExpection } from "../../expections/user-with-same-email-exception";

interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password, name }: CreateUserRequest) {
    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) throw new UserWithSameEmailExpection();

    const user = new User({
      name,
      email,
      password: await hash(password, 10)
    });
    
    await this.userRepository.create(user);

    return user;
  }
}