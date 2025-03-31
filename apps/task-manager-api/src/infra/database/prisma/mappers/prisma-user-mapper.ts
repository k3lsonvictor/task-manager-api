import { User as UserRaw } from '@prisma/client';
import { User } from 'src/modules/user/entities/user';

export class PrismaUserMapper {
  static toPrisma({ createdAt, email, name, password, id }: User): UserRaw {
    return {
      createdAt,
      email,
      name,
      password,
      id,
    };
  }

  static toDomain({ createdAt, email, name, password, id }: UserRaw): User {
    return new User(
      {
        createdAt,
        email,
        name,
        password,
      },
      id,
    );
  }
}
