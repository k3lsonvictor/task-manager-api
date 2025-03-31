import { UserRepositoryInMemory } from '../../repositories/user-repository-in-memory';
import { CreateUserUseCase } from './create-user-use-case';
import { UserWithSameEmailExpection } from '../../expections/user-with-same-email-exception';
import { makeUser } from '../../factory/user-factory';

describe('Create User Use Case', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: UserRepositoryInMemory;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('Should create a new user successfully', async () => {
    const userData = makeUser({});

    const user = await createUserUseCase.execute(userData);

    expect(user).toHaveProperty('id');
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.password).not.toBe(userData.password); // Senha deve estar hashada
  });

  it('Should throw an exception if email already exists', async () => {
    const userData = makeUser({});

    await createUserUseCase.execute(userData);

    await expect(createUserUseCase.execute(userData)).rejects.toThrow(
      UserWithSameEmailExpection,
    );
  });
});
