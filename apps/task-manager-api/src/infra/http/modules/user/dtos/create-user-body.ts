import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserBody {
  @ApiProperty({
    example: "user@example.com",
    description: "Endereço de e-mail do usuário",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "123456",
    description: "Senha do usuário",
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: "John",
    description: "Nome do usuário",
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}