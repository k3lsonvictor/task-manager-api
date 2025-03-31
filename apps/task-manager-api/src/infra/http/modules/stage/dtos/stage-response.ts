import { ApiProperty } from '@nestjs/swagger';

export class StageResponseDto {
  @ApiProperty({
    description: 'ID da etapa',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({ description: 'Nome da etapa', example: 'Planejamento' })
  name: string;

  @ApiProperty({
    description: 'Data de criação da etapa',
    example: '2024-02-21T10:00:00.000Z',
  })
  createdAt: Date;
}
