import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserPayload } from '../../models/user-payload';

interface SignInRequest {
  user: User;
}

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService) {}

  async execute({ user }: SignInRequest) {
    const payload: UserPayload = {
      sub: user.id, // O ID do usuário
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toJSON(),
    };

    const jwtToken = this.jwtService.sign(payload);

    return { access_token: jwtToken, userId: user.id }; // Retorna o token e o userId
  }
}
