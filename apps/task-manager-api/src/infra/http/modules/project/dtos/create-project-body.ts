import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProjectBody {
  @ApiProperty({
    name: "Projeto 1"
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    name: "Descrição do projeto",
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;
}