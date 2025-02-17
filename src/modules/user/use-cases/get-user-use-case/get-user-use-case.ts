import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../../repositories/user-repository";
import { User } from "../../entities/user";

interface GetUserRequest {
  id: string; // Pode ser alterado para 'id' ou outro identificador, se necessário
}

@Injectable()
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: GetUserRequest): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with email ${id} not found`);
    }

    return user;
  }
}
