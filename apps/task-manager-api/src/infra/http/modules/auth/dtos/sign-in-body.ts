import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignInBody {
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
    description: "Senha do usuário, deve ter no mínimo 6 caracteres",
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
