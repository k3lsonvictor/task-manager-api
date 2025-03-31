import { ApiProperty } from '@nestjs/swagger';

export class UserCreateResponseDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
  name: string;

  @ApiProperty({ description: 'E-mail do usuário', example: 'joao@email.com' })
  email: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-02-21T10:00:00.000Z',
  })
  createdAt: Date;
}
