import { JwtService } from '@nestjs/jwt';
import { SignInUseCase } from './sign-in-use-case';
import { makeUser } from '../../../user/factory/user-factory';

describe('Sign In Use Case', () => {
  let signInUseCase: SignInUseCase;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'test-secret' }); // Configuração do JwtService
    signInUseCase = new SignInUseCase(jwtService);
  });

  it('Should generate a JWT token successfully', async () => {
    const user = makeUser({});

    const result = await signInUseCase.execute({ user: user });

    expect(result).toHaveProperty('access_token');
    expect(result).toHaveProperty('userId', user.id);

    // Verifica se o token JWT é válido
    const decodedToken = jwtService.decode(result.access_token);
    expect(decodedToken).toMatchObject({
      sub: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toJSON(),
    });
  });
});
