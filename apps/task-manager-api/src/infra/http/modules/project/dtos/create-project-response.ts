import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID único do projeto',
  })
  id: string;

  @ApiProperty({
    example: 'Sistema de Gestão',
    description: 'Nome do projeto',
  })
  name: string;

  @ApiProperty({
    example: 'Um sistema para gerenciar tarefas e equipes.',
    description: 'Descrição detalhada do projeto',
  })
  description: string;

  @ApiProperty({
    example: '2024-02-21T12:34:56.789Z',
    description: 'Data de criação do projeto',
  })
  createdAt: Date;
}
