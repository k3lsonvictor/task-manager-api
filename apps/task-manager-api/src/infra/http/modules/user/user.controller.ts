import { Body, Controller, Get, Param, Post, HttpStatus } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/use-cases/create-user-use-case/create-user-use-case';
import { CreateUserBody } from './dtos/create-user-body';
import { Public } from '../auth/decorators/is-public';
import { UserViewModel } from './view-model/user-view-model';
import { GetUserUseCase } from 'src/modules/user/use-cases/get-user-use-case/get-user-use-case';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { UserCreateResponseDto } from './dtos/create-user-response';

@ApiTags('Users') // Define a categoria no Swagger
@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
  ) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiBody({
    description: 'Dados necessários para criar um usuário',
    type: CreateUserBody,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso',
    type: UserCreateResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  })
  async createUser(@Body() body: CreateUserBody) {
    const { name, email, password } = body;

    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });

    return UserViewModel.toHttp(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um usuário pelo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário encontrado',
    type: UserCreateResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  async getUser(@Param('id') id: string) {
    const user = await this.getUserUseCase.execute({ id });

    return UserViewModel.toHttp(user);
  }
}
