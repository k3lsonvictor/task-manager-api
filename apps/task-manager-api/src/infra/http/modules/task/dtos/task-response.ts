import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
  @ApiProperty({
    description: 'ID da tarefa',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Definir requisitos do projeto',
  })
  title: string;

  @ApiProperty({
    description: 'Descrição da tarefa',
    example: 'Reunir equipe para discutir os requisitos iniciais.',
  })
  description: string;

  @ApiProperty({
    description: 'Data de vencimento da tarefa',
    example: '2024-03-01T12:00:00.000Z',
    required: false,
  })
  dueDate?: Date;

  @ApiProperty({
    description: 'Posição da tarefa dentro do estágio',
    example: 1,
  })
  position: number;

  @ApiProperty({
    description: 'ID do estágio ao qual a tarefa pertence',
    example: '456e7890-a12b-34c5-d678-9012ef345678',
  })
  stageId: string;

  @ApiProperty({
    description: 'Data de criação da tarefa',
    example: '2024-02-21T10:00:00.000Z',
  })
  createdAt: Date;
}
