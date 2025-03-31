import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStageBody {
  @ApiProperty({
    example: 'Projeto 1',
    description: 'Nome da etapa',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '12341234123412341234',
    description: 'Id do projeto em que a etapa está contida',
  })
  @IsString()
  @IsNotEmpty()
  projectId: string;
}
