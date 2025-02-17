import { hash } from 'bcrypt';
import { ValidateUserUseCase } from './validate-user-use-case';
import { UserRepositoryInMemory } from 'src/modules/user/repositories/user-repository-in-memory';
import { makeUser } from 'src/modules/user/factory/user-factory';
import { AuthValuesIncorrectException } from '../../exceptions/auth-values-incorrect-exceptions';

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Validate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it('Should return the user when credentials are correct', async () => {
    const userPasswordWithoutEncryption = '123123';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    const result = await validateUserUseCase.execute({
      email: user.email,
      password: userPasswordWithoutEncryption,
    });

    expect(result).toEqual(user);
  });

  it('Should throw AuthValuesIncorrectException when credentials are incorrect', async () => {
    const userPasswordWithoutEncryption = '123123';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    await expect(
      validateUserUseCase.execute({
        email: 'incorrect@gmail.com',
        password: userPasswordWithoutEncryption,
      })
    ).rejects.toThrow(AuthValuesIncorrectException);

    await expect(
      validateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password',
      })
    ).rejects.toThrow(AuthValuesIncorrectException);
  });
});
