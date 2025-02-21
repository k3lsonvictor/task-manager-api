import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class EditStageBody {
  @ApiProperty({
    example: "etapa 1",
    description: "Nome da etapa do projeto",
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}