import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class EditProjectBody {
  @ApiProperty({
    description: "Nome do projeto",
    example: "Meu Novo Projeto",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: "Descrição opcional do projeto",
    example: "Este é um projeto de exemplo para demonstração.",
  })
  @IsString()
  @IsOptional()
  description?: string;
}
